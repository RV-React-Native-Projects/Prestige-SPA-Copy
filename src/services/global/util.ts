import _ from "lodash";

interface EachFunction<T> {
  (key: string | number, value: T, obj: Record<string | number, T> | T[]): void;
}

export function each<T>(
  obj: Record<string | number, T> | T[],
  func: EachFunction<T>,
): void {
  if (!obj) {
    return;
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; ++i) {
      func(i, obj[i], obj);
    }
  }

  if (typeof obj === "object" && !Array.isArray(obj)) {
    for (let key in obj) {
      func(key, obj[key], obj);
    }
  }
}

export default {
  each,
  values: _.values,
  clone: _.clone,
};
