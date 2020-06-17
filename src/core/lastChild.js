import { isDefined } from "./../utils/";

/**
 * Given a nodePros it returns the `lastChild` func
 * once it's called within a node context it returns the last node child if any.
 *
 *
 * @since 1.0.0
 * @category Function
 * @returns {(Object|null)} the child node if it has got any or null
 * @example
 *
 * import { create } from "jsonldbuilder"
 * const schema = create();
 * schema.ele("address").att("city", "Milan");
 * schema.ele("info").att("name", "Antonio");
 * schema.lastChild();
 *
 */

export const lastChild = (nodeProps) => ({
  lastChild() {
    const lastChild = nodeProps.children[nodeProps.children.length - 1];
    return isDefined(lastChild) ? lastChild : null;
  },
});
