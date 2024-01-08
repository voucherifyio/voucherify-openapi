export const asyncMap = (arr, asyncFn) => {
  return Promise.all(arr.map(asyncFn));
};
