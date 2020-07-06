import fs from 'fs';
import util from 'util';

fs.unlink = util.promisify(fs.unlink);

export default async (ctx) => {
  const { fileName } = ctx.request.body;

  ctx.assert(fileName, 'No file provided');
  await fs.unlink(fileName);
  ctx.body = {
    error: false,
    message: 'File successfully deleted',
  };
};
