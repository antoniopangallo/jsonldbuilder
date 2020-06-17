/**
 *  Given a nodePros it returns the `children` func
 *  once it's called within a node context it returns an array of children nodes.
 *
 *
 * @since 1.0.0
 * @category Function
 * @returns {Array} list of children nodes
 * @example
 *
 * import { create } from "jsonldbuilder"
 * const schema = create();
 * const address = schema.ele("address");
 * console.log(schema.children);
 *
 */

export const children = (nodeProps) => ({
  get children() {
    return nodeProps.children;
  },
});
