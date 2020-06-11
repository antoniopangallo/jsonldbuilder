import { isDefined, isArray } from "./../utils/";
import { createNode } from "./createNode";

export const ele = (nodeProps) => ({
  ele(key, type = "object") {
    let { state, children, rootElementNode, schemaProps } = nodeProps;
    let pointer = null;
    // if (isDefined(state[key]) && !isArray(state[key])) {
    //   const saveCurrent = state[key];
    //   state[key] = [saveCurrent, {}];
    //   pointer = state[key][state[key].length - 1];
    // } else if (isDefined(state[key]) && isArray(state[key])) {
    //   state[key].push({});
    //   pointer = state[key][state[key].length - 1];
    // } else {
    //   state[key] = {};
    //   pointer = state[key];
    // }

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

export const att = (nodeProps) => ({
  att(key, value) {
    if (!isDefined(nodeProps.state[key])) {
      nodeProps.state[key] = value;
    } else if (isDefined(nodeProps.state[key])) {
      if (isArray(nodeProps.state[key])) {
        nodeProps.state[key].push(value);
      } else {
        const currentValue = nodeProps.state[key];
        nodeProps.state[key] = [currentValue, value];
      }
    }
    return this;
  },
});

export const children = (nodeProps) => ({
  get children() {
    return nodeProps.children;
  },
});

export const firstChild = (nodeProps) => ({
  firstChild() {
    const firstChild = nodeProps.children[0];
    return isDefined(firstChild) ? firstChild : null;
  },
});

// Returns the last child nodeProps.
export const lastChild = (nodeProps) => ({
  lastChild() {
    const lastChild = nodeProps.children[nodeProps.children.length - 1];
    return isDefined(lastChild) ? lastChild : null;
  },
});

// Returns the next sibling nodeProps.
export const next = (nodeProps) => ({
  next() {
    const nextElm = this.up().children[nodeProps.position + 1];
    return isDefined(nextElm) ? nextElm : null;
  },
});

export const prev = (nodeProps) => ({
  prev() {
    const prevElm = this.up().children[nodeProps.position - 1];
    return isDefined(prevElm) ? prevElm : null;
  },
});

// Returns the parent element nodeProps.
export const up = (nodeProps) => ({
  up() {
    return nodeProps.parent;
  },
});

export const get = (nodeProps) => ({
  get() {
    return nodeProps.state;
  },
});

export const stringify = (nodeProps) => ({
  stringify() {
    return JSON.stringify(nodeProps.state);
  },
});

/*  Returns the root element nodeProps.
    root can be called from anywhere */
export const getRoot = (nodeProps) => ({
  /* if rootElementNode is null it means that the method
     has been invoked on the root node of the Tree before creating any child node */
  root() {
    return !isDefined(nodeProps.rootElementNode)
      ? this
      : nodeProps.rootElementNode;
  },
});

export const applySchema = (nodeProps) => {
  const obj = Object.keys(nodeProps.schemaProps).reduce((acc, key) => {
    const { type, defaultValue, opts } = nodeProps.schemaProps[key];
    const nameFunc =
      isDefined(opts) && typeof opts.nameFunc === "string"
        ? opts.nameFunc
        : key;
    acc = {
      ...acc,
      [nameFunc](value) {
        if (type === "attribute") {
          return this.att(key, value || defaultValue);
        } else {
          return this.ele(key);
        }
      },
    };
    return acc;
  }, {});
  return obj;
};

export const valid = (nodeProps) => ({
  valid() {
    const { schemaProps, state } = nodeProps;
    return traverse(state, schemaProps);
  },
});

function traverse(state, schemaProps) {
  return Object.keys(schemaProps).every((key) => {
    return check(schemaProps[key], state[key]);
    // const { required, type } = schemaProps[key];
    // if (required) {
    //   if (!isDefined(state[key])) return false;
    //   if (type === "element") {
    //     const arrayOf = schemaProps[key].arrayOf !== undefined;
    //     const objectOf = schemaProps[key].objectOf !== undefined;

    //     const schemaElm = schemaProps[key].arrayOf || schemaProps[key].objectOf;
    //     if (arrayOf) {
    //       return checkArrayOf(state[key], schemaElm);
    //     } else if (objectOf) {
    //       return true;
    //     }
    //   } else if (type === "attribute") {
    //     return isDefined(state[key]);
    //   }
    // } else {
    //   return true;
    // }
  });
}

function checkArrayOf(state, schemaElm) {
  const keysSchema = Object.keys(schemaElm);
  return state.every((value) => {
    const isContained = Object.keys(value).every(
      (item) => keysSchema.indexOf(item) !== -1
    );
    if (!isContained) return false;

    return keysSchema.every((propSchema) => {
      // return check(schemaElm, value, propSchema);
      console.log(schemaElm[propSchema], value[propSchema]);
      return check(schemaElm[propSchema], value[propSchema]);

      // const { required, type } = schemaElm[propState];
      // if (required) {
      //   if (!isDefined(value[propState])) return false;
      //   if (type === "element") {
      //     const arrayOf = schemaProps[key].arrayOf !== undefined;
      //     const objectOf = schemaProps[key].objectOf !== undefined;

      //     const schemaElm =
      //       schemaProps[key].arrayOf || schemaProps[key].objectOf;
      //     if (arrayOf) {
      //       return checkArrayOf(state[propState], schemaElm);
      //     } else if (objectOf) {
      //       return true;
      //     }
      //   } else if (type === "attribute") {
      //     return isDefined(value[propState]);
      //   }
      // } else {
      //   return true;
      // }
    });
  });
}

function checkObjectOf(state, schemaElm) {
  console.log("checkObjectOf - ", state, schemaElm);
  return true;
}

function check(schemaElm, value) {
  const { required, type, arrayOf, objectOf } = schemaElm;
  if (required) {
    if (!isDefined(value)) return false;
    if (type === "element") {
      const schemaElm = arrayOf || objectOf;
      if (arrayOf !== undefined) {
        return checkArrayOf(value, schemaElm);
      } else if (objectOf !== undefined) {
        return checkObjectOf(value, schemaElm);
      }
    } else if (type === "attribute") {
      return isDefined(value);
    }
  } else {
    return true;
  }
}
