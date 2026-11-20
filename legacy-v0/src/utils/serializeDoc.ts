export const serializeDoc = <T extends object>(doc: any): T => {
  const result: any = {};
  for (const key of Object.keys(doc)) {
    if (key === 'id') continue;
    const val = doc[key];
    if (val === null) {
      result[key] = null;
    } else if (val === undefined) {
      result[key] = null;
    } else if (typeof val?.toDate === 'function') {
      result[key] = val.toDate().toISOString();
    } else if (val instanceof Date) {
      result[key] = val.toISOString();
    } else if (Array.isArray(val)) {
      result[key] = val.map(v =>
        typeof v?.toDate === 'function' ? v.toDate().toISOString() : v
      );
    } else if (typeof val === 'object') {
      result[key] = serializeDoc(val);
    } else {
      result[key] = val;
    }
  }
  return result as T;
};
