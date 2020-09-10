import { isDefined } from "./../utils/";

/**
 * It returns the first node child if any.
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
 * schema.firstChild();
 *
 */

export const firstChild = (nodeProps) => ({
  firstChild() {
    const firstChild = nodeProps.children[0];
    return isDefined(firstChild) ? firstChild : null;
  },
});
