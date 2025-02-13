/**
 * 深拷贝函数
 * @param {any} value - 需要深拷贝的值
 * @param {WeakMap} [hash=new WeakMap()] - 用于处理循环引用的 WeakMap
 * @returns {any} - 深拷贝后的值
 */
function deepClone(value, hash = new WeakMap()) {
  // 处理 null 或基本类型
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // 处理循环引用
  if (hash.has(value)) {
    return hash.get(value);
  }

  // 处理日期对象
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  // 处理正则表达式
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }

  // 处理 Map
  if (value instanceof Map) {
    const map = new Map();
    hash.set(value, map);
    value.forEach((val, key) => {
      map.set(deepClone(key, hash), deepClone(val, hash));
    });
    return map;
  }

  // 处理 Set
  if (value instanceof Set) {
    const set = new Set();
    hash.set(value, set);
    value.forEach(val => {
      set.add(deepClone(val, hash));
    });
    return set;
  }

  // 处理数组和对象
  const cloned = Array.isArray(value) ? [] : {};
  hash.set(value, cloned);

  // 获取所有属性，包括 Symbol 类型的键
  const keys = [...Object.getOwnPropertyNames(value), ...Object.getOwnPropertySymbols(value)];

  for (const key of keys) {
    cloned[key] = deepClone(value[key], hash);
  }

  return cloned;
}

export default deepClone; 