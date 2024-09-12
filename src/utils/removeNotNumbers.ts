export const removeNotNumbers = (doc?: string) => {
  return doc?.replace(/[^0-9]+/g, '') ?? '';
};
