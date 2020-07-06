import bodyParser from 'koa-body';
import imagesController from '../images';
import { photosCache } from "../../models/Controller";

import cards from '../cards';

const controllers = {
  cards,
};

export default [
  bodyParser({
    formidable: {
      uploadDir: 'uploads',
      onFileBegin: (name, file) => {
        const ext = file.name.match(/(.*)\.(.*)/)[2];

        // eslint-disable-next-line no-param-reassign
        file.path = `${file.path.replace('upload_', '')}.${ext}`;
      },
    },
    multipart: true,
    urlencoded: true,
  }),
  async (ctx) => {
    const { relation, relatedId, id, type, owner, param } = ctx.request.body;
    const name = ctx.request.files.file.path.replace(/^uploads\//, '');
    if (owner) {
      ctx.body = {
        meta: {
          notify: false
        }
      }
      photosCache[`${id || 'add'}-${owner}`] = {
        param,
        photo: name
      };

      return;
    }
    ctx.params = {
      data: {
        name,
      },
    };
    if (id) {
      ctx.params.data.id = id;
      ctx.params.meta = { update: true };
      await imagesController.update(ctx);
    } else {
      await imagesController.add(ctx);
    }
    if (relation) {
      ctx.params = {
        relation: 'images',
        id: relatedId,
        data: {
          imagesId: ctx.body.data.id,
        },
        meta: {
          ref: relation,
        },
      };
      await controllers[relation].addRelated(ctx);
    }
    ctx.body.data = Object.assign({}, ctx.body.data, {
      type,
      name,
    });
  },
];
