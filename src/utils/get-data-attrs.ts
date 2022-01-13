export const getDataAttrs = (props: any = {}): any => {
  return Object.entries(props).reduce((dataAttrs: any, [key, value]) => {
    if (key.startsWith('data-')) {
      dataAttrs[key] = value;
    }
    return dataAttrs;
  }, {});
};
