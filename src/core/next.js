import { isDefined } from "./../utils/";

/**
 * It returns the sibilign node.
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
 * schema.firstChild().next();
 *
 */

export const next = (nodeProps) => ({
  next() {
    const nextElm = this.up().children[nodeProps.position + 1];
    return isDefined(nextElm) ? nextElm : null;
  },
});
