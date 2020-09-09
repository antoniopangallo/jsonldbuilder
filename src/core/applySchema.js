import { isDefined } from "./../utils/";

/**
 * Given a nodePros it applies the schema at creation time if present.
 * It creates a object of funcs which will be spread into createNode
 * enhancing the Node base API
 *
 * @since 1.0.0
 * @function
 * @ignore
 * @returns {Object} an object which will be spread into createNode
 * @example
 *
 * import { create } from "jsonldbuilder"
 * const schemaValidator = {
 *   "@type": {
 *       opts: { alias: "type" },
 *       required: true,
 *       defaultValue: "Restaurant",
 *       type: "attribute"
 *   }
 * }
 * const schema = create(schemaValidator);
 * schema.type(); // vs schema.ele("@type", "Restaurant")
 *
 */

export const applySchema = (nodeProps) => {
  const obj = Object.keys(nodeProps.schemaProps).reduce((acc, key) => {
    const { type, defaultValue, opts } = nodeProps.schemaProps[key];
    const nameFunc =
      isDefined(opts) && typeof opts.alias === "string" ? opts.alias : key;
    acc = {
      ...acc,
      [nameFunc](value) {
        if (type === "attribute") {
          return this.att(key, value || defaultValue);
        } else {
          return this.ele(key);
        }
      },
    };
    return acc;
  }, {});
  return obj;
};
