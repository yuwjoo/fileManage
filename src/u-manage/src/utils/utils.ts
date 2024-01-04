/**
 * @description: 排除对象中的空值
 * @param {Record<string, any>} obj 目标对象
 * @return {Record<string, any>} 新对象
 */
export function excludeEmptyValue(obj: Record<string, any>) {
  let newObj: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== undefined && value !== null && value !== "") {
      newObj[key] = value;
    }
  });
  return newObj;
}
