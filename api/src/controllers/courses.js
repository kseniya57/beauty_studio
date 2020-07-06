import Controller from '../models/Controller';
import sendMail from '../utils/sendMail';
import db from '../utils/db';

const courseRecording = async (ctx) => {

  const { name, phone, course } = ctx.params;

  sendMail({
    subject: 'Запись на курс',
    text: `
      Имя: ${name}
      Телефон: ${phone}
      Курс: ${course}
    `
  }).catch(console.error);

  ctx.body = { error: false };
}

class CoursesController extends Controller {
  async get(ctx) {
    const course = await this.table.get(ctx.params.id);
    course.teacher = await db.queryRow('SELECT * FROM masters WHERE  id = ?', [course.teachersId])
    ctx.body = {
      data: course
    };
  }
}

export default new CoursesController('/courses', 'courses', {
  jsonFields: ['schedule', 'theory', 'practice'],
  all: {
    fields: 'id, title, description, price, discount',
    pagination: {
      order: ['sort'],
    },
  },
}, [
  ['post', '/recording', courseRecording],
]);
