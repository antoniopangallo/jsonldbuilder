/**
 * It returns an array of children nodes.
 *
 *
 * @since 1.0.0
 * @constant
 * @returns {Array} list of children nodes
 * @example
 *
 * import { create } from "jsonldbuilder"
 * const schema = create();
 * const address = schema.ele("address");
 * console.log(schema.children);
 */

export const children = (nodeProps) => ({
  get children() {
    return nodeProps.children;
  },
});
