import { isDefined } from "./../utils/";

/**
 * Given a nodePros it returns the `getRoot` func
 * once it's called within a node context it returns root node.
 * root() can be called from anynode at any level
 *
 *
 * @since 1.0.0
 * @category Function
 * @returns {Object)} the root node
 * @example
 *
 * import { create } from "jsonldbuilder"
 * const schema = create();
 * const address = schema.ele("address");
 * address.ele("info").att("city", "Milan");
 * address.ele("info").att("name", "Antonio").root();
 *
 */

export const getRoot = (nodeProps) => ({
  /* if rootElementNode is null it means that the method
         has been invoked on the root node of the Tree before creating any child node */
  root() {
    return !isDefined(nodeProps.rootElementNode)
      ? this
      : nodeProps.rootElementNode;
  },
});
