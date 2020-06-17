/**
 * Given a nodePros it returns the `stringify` func
 * once it's called within a node context it returns the stringify object state of the node.
 *
 *
 * @since 1.0.0
 * @category Function
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
