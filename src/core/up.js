/**
 * Given a nodePros it returns the `up` func
 * once it's called within a node context it returns the parent of node.
 *
 *
 * @since 1.0.0
 * @category Function
 * @returns {Object} the parent node
 * @example
 *
 * import { create } from "jsonldbuilder"
 * const schema = create();
 * const address = schema.ele("address");
 * address.up();
 *
 */

export const up = (nodeProps) => ({
  up() {
    return nodeProps.parent;
  },
});
