const toString = Object.prototype.toString;

export const isObject = (obj: any) => {
  return Object.is(toString.call(obj), '[object Object]');
};

export const isRegExp = (v: any) => {
  return Object.is(toString.call(v), '[object RegExp]');
};

// 验证val 是否为有效的数组下标
export const isValidArrayIndex = (val: number) => {
  const n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
};

export const isString = (str: any) => {
  return Object.is(toString.call(str), '[object String]');
};

// 判断是否为uuid
export const isUUID = (str: string) => {
  return /\w{8}(-\w{4}){3}-\w{12}/.test(str);
};
