/**
 * It returns the stringify object state of the node.
 *
 *
 * @since 1.0.0
 * @function
 * @returns {String} the stringify state of the node
 * @example
 *
 * import { create } from "jsonldbuilder"
 * const schema = create();
 * const address = schema.ele("address");
 * schema.stringify();
 *
 */

export const stringify = (nodeProps) => ({
  stringify() {
    return JSON.stringify(nodeProps.state);
  },
});
