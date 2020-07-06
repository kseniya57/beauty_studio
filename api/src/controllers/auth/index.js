import Controller from '../../models/Controller';
import check from './check';
import login from './login';
import register from './register';

const authController = new Controller('/auth', 'users', undefined, [
  ['get', '/check', check],
  ['post', '/login', login],
  ['post', '/register', register],
]);

export default authController;
