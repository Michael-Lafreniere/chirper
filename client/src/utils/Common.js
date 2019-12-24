// Used to help parse chirps for @ and #'s and eventually links (http/https):
export const createShortcode = (type, entity) => {
  return `[${type}:${entity}]`;
};
