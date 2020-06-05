export const isDefined = (obj) => typeof obj !== "undefined" && obj !== null;
export const isArray = (obj) => isDefined(obj) && obj.constructor === Array;
