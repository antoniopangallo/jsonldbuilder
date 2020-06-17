/**
 * Given a nodePros it returns the `get` func
 * once it's called within a node context it returns object state of the node.
 *
 *
 * @since 1.0.0
 * @category Function
 * @returns {Object} the state of the node
 * @example
 *
 * import { create } from "jsonldbuilder"
 * const schema = create();
 * const address = schema.ele("address");
 * address.get();
 *
 */

export const get = (nodeProps) => ({
  get() {
    return nodeProps.state;
  },
});
