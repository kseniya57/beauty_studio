const history = require('history').createBrowserHistory({ basename: '/admin' });

export const goTo = (path) => () => history.push(path);

export default history;