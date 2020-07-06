export default (selector, type = 'start') =>
  document.querySelector(selector).scrollIntoView({
    block: type,
    behavior: 'smooth'
  });
