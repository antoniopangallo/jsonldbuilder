import { isDefined } from "./../utils/";

/**
 * It returns the last node child if any.
 *
 *
 * @since 1.0.0
 * @function
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
