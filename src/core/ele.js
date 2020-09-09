import { isDefined, isArray } from "./../utils/";

/**
 *  Given a nodePros it returns the `ele` func
 *  once it's called within a node context it creates a new node.
 *
 *
 * @since 1.0.0
 * @function
 * @param {string} key the node name.
 * @param {string} [type=object] - force the node to be either an object or array by default.
 * @returns {Object} Node created
 * @example
 *
 * import { create } from "jsonldbuilder"
 * const schema = create();
 * const address = schema.ele("address")
 * const info = schema.ele("info")
 *
 */

export const ele = (nodeProps, createNode) => ({
  ele(key, type = "object") {
    let { state, children, rootElementNode, schemaProps } = nodeProps;
    let pointer = null;

    if (isDefined(state[key]) && !isArray(state[key])) {
      const saveCurrent = state[key];
      state[key] = [saveCurrent, {}];
      pointer = state[key][state[key].length - 1];
    } else if (isDefined(state[key]) && isArray(state[key])) {
      state[key].push({});
      pointer = state[key][state[key].length - 1];
    } else if (!isDefined(state[key])) {
      if (
        (schemaProps[key] !== undefined &&
          schemaProps[key].arrayOf !== undefined) ||
        type === "array"
      ) {
        state[key] = [{}];
        pointer = state[key][0];
      } else {
        state[key] = {};
        pointer = state[key];
      }
    }

    // progate down the rootNode reference to all nodes
    // rootElementNode is null if the node is the root node
    // otherwise it is always a pointer to the root node
    rootElementNode = !isDefined(rootElementNode) ? this : rootElementNode;

    const startPosition = children.length;

    // console.log(schemaProps, key, schemaProps[key]);
    const pieceOfSchema =
      schemaProps[key] &&
      (schemaProps[key].arrayOf || schemaProps[key].objectOf);

    const childNode = createNode(
      pieceOfSchema,
      this, // it's parent node
      pointer,
      rootElementNode,
      startPosition // position for getting next and prev siblings
    );

    children.push(childNode);
    return childNode;
  },
});
