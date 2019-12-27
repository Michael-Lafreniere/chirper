// Used to help parse chirps for @ and #'s and eventually links (http/https):
export const createShortcode = (type, entity) => {
  return `[${type}:${entity}]`;
};

export const verifyString = string => {
  if (string !== undefined && string.length > 0) return true;
  return false;
};
