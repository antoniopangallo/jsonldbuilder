import { isDefined } from "./../utils/";

/**
 * It returns prev the sibilign node.
 *
 *
 * @since 1.0.0
 * @function
 * @returns {(Object|null)} the sibilign node if it has got any or null
 * @example
 *
 * import { create } from "jsonldbuilder"
 * const schema = create();
 * const address = schema.ele("address");
 * address.ele("info").att("city", "Milan");
 * address.ele("info").att("name", "Antonio");
 * schema.next();
 * schema.prev();
 *
 */

export const prev = (nodeProps) => ({
  prev() {
    const prevElm = this.up().children[nodeProps.position - 1];
    return isDefined(prevElm) ? prevElm : null;
  },
});
