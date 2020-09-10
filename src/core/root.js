import { isDefined } from "./../utils/";

/**
 * It returns root node.
 * root() can be called from anynode at any level
 *
 *
 * @since 1.0.0
 * @function
 * @returns {Object} the root node
 * @example
 *
 * import { create } from "jsonldbuilder"
 * const schema = create();
 * const address = schema.ele("address");
 * address.ele("info").att("city", "Milan");
 * address.ele("info").att("name", "Antonio").root();
 *
 */

export const root = (nodeProps) => ({
  /* if rootElementNode is null it means that the method
         has been invoked on the root node of the Tree before creating any child node */
  root() {
    return !isDefined(nodeProps.rootElementNode)
      ? this
      : nodeProps.rootElementNode;
  },
});
