/**
 * It returns object state of the node.
 *
 *
 * @since 1.0.0
 * @function
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
