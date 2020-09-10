import { isDefined, isArray } from "./../utils/";

/**
 * It adds a new attribute into the node.
 *
 *
 * @since 1.0.0
 * @function
 * @param {string} key attribute name.
 * @param {string} value the attribute value.
 * @returns {Object} current Node
 * @example
 *
 * import { create } from "jsonldbuilder"
 * const schema = create();
 * const address = schema.ele("address");
 * address.att("city", "Milan");
 *
 */

export const att = (nodeProps) => ({
  att(key, value) {
    if (!isDefined(nodeProps.state[key])) {
      nodeProps.state[key] = value;
    } else if (isDefined(nodeProps.state[key])) {
      if (isArray(nodeProps.state[key])) {
        nodeProps.state[key].push(value);
      } else {
        const currentValue = nodeProps.state[key];
        nodeProps.state[key] = [currentValue, value];
      }
    }
    return this;
  },
});
