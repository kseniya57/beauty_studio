const history = require('history').createBrowserHistory();

export const goTo = (path) => () => history.push(path);

history.listen(() => {
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 0)
});

export default history;