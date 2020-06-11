import {
  applySchema,
  ele,
  att,
  children,
  firstChild,
  lastChild,
  next,
  prev,
  getRoot,
  up,
  stringify,
  get,
  valid,
} from "./composer";

export function createNode(
  schemaProps = {},
  parent = null,
  state = {},
  rootElementNode = null,
  position = 0
) {
  const stateNode = {
    parent,
    state,
    position,
    children: [],
    rootElementNode,
    schemaProps,
  };

  return {
    ...applySchema(stateNode),
    ...ele(stateNode),
    ...att(stateNode),
    ...children(stateNode),
    ...firstChild(stateNode),
    ...lastChild(stateNode),
    ...getRoot(stateNode),
    ...prev(stateNode),
    ...next(stateNode),
    ...up(stateNode),
    ...get(stateNode),
    ...stringify(stateNode),
    ...valid(stateNode),
    // ele(key) {
    //   let pointer = null;
    //   if (isDefined(root[key]) && !isArray(root[key])) {
    //     const saveCurrent = root[key];
    //     root[key] = [saveCurrent, {}];
    //     pointer = root[key][root[key].length - 1];
    //   } else if (isDefined(root[key]) && isArray(root[key])) {
    //     root[key].push({});
    //     pointer = root[key][root[key].length - 1];
    //   } else {
    //     root[key] = {};
    //     pointer = root[key];
    //   }

    //   // progate down the rootNode reference to all nodes
    //   // rootElementNode is null if the node is the root node
    //   // otherwise it is always a pointer to the root node
    //   rootElementNode = !isDefined(rootElementNode) ? this : rootElementNode;

    //   const startPosition = children.length;

    //   // console.log(schemaProps, key, schemaProps[key]);
    //   const pieceOfSchema =
    //     schemaProps[key] &&
    //     (schemaProps[key].arrayOf || schemaProps[key].objectOf);

    //   const childNode = createNode(
    //     pieceOfSchema,
    //     this, // my Parent
    //     pointer,
    //     rootElementNode,
    //     startPosition // position for getting next and prev siblings
    //   );

    //   children.push(childNode);
    //   return childNode;
    // },

    // type(typeName) {
    //   if (isDefined(typeName) && typeof typeName === "string") {
    //     root["@type"] = typeName;
    //   }
    //   return this;
    // },

    // att(key, value) {
    //   if (!isDefined(root[key])) {
    //     root[key] = value;
    //   } else if (isDefined(root[key])) {
    //     if (isArray(root[key])) {
    //       root[key].push(value);
    //     } else {
    //       const currentValue = root[key];
    //       root[key] = [currentValue, value];
    //     }
    //   }
    //   return this;
    // },

    // get children() {
    //   return children;
    // },
    // Returns the first child node.
    // firstChild() {
    //   const firstChild = children[0];
    //   return isDefined(firstChild) ? firstChild : null;
    // },

    // // Returns the last child node.
    // lastChild() {
    //   const lastChild = children[children.length - 1];
    //   return isDefined(lastChild) ? lastChild : null;
    // },

    // Returns the next sibling node.
    // next() {
    //   const nextElm = this.up().children[position + 1];
    //   return isDefined(nextElm) ? nextElm : null;
    // },

    // Returns the prev sibling node.
    // prev() {
    //   const prevElm = this.up().children[position - 1];
    //   return isDefined(prevElm) ? prevElm : null;
    // },

    // // Returns the parent element node.
    // up() {
    //   return parent;
    // },

    // get() {
    //   return root;
    // },

    // stringify() {
    //   return JSON.stringify(root);
    // },

    // /*  Returns the root element node.
    //     root can be called from anywhere */
    // root() {
    //   /* if rootElementNode is null it means that the method
    //      has been invoked on the root node of the Tree before creating any child node */
    //   return !isDefined(rootElementNode) ? this : rootElementNode;
    // },
  };

  return this.__self;
}
