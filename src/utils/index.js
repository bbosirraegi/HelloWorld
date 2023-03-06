import { Buffer } from 'buffer';
export { default as TypeManager } from './TypeManager';
export { default as ApiManager } from './ApiManager';

/**
 * 쿠키찾기
 * --
 */
export const getCookie = (name, options = null) => {
  const value = window.document.cookie.match(
    '(^|;) ?' + name + '=([^;]*)(;|$)'
  );
  return value ? value[2] : null;
};

/**
 * 쿠키저장
 */
export const setCookie = (name, value, callback = false) => {
  window.document.cookie = `${name}=${value}; path=/;max-age=${
    3600 * 8
  };Domain=${PUBLIC_URL};Path='/'`;
  if (callback) callback();
};

/**
 * 쿠키삭제
 */
export const deleteCookie = (name) => {
  if (getCookie(name)) {
    window.document.cookie = `${name}=;path=/;domain=${PUBLIC_URL};expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    // window.document.cookie =
    //   name +
    //   '=' +
    //   (path ? ';path=' + path : '') +
    //   (domain ? ';domain=' + domain : '') +
    //   ';expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
};

/**
 * Buffer 쓰기
 * --
 * @param {string} str
 * @returns
 */
export const writeBuffer = (str, format = 'base64') => {
  return Buffer.from(str, 'utf8').toString(format);
};

/**
 * Buffer 읽기
 * --
 * @param {string} str
 * @returns
 */
export const readBuffer = (str, format = 'base64') => {
  return Buffer.from(str, format).toString('utf8');
};

/**
 * 금액포매터
 * --
 * @param {*} v
 * @param {*} unit
 * @returns
 */
export const stringToMoneyFormat = (v = 0, unit = '') => {
  // const value = String(isNull(v) ? 0 : v)
  const value = String(v ? v : 0)
    .split('')
    .reverse()
    .join('');
  const valueLength = value.length;
  let result = '';
  for (let ii in value) {
    result += String(value[ii]);
    if ((ii + 1) % 3 === 0 && ii < valueLength - 1) {
      result += ',';
    }
  }
  return `${result.split('').reverse().join('')}${unit}`;
};
