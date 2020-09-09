import { isDefined } from "./../utils/";

/**
 *  Given a nodePros it returns the `valid` func
 *  once it's called within a node context it validates the node against a schema.
 *
 *
 * @since 1.0.0
 * @function
 * @returns {boolean} true if node is valid, false otherwise
 * @example
 *
 * import { create } from "jsonldbuilder"
 * const schemaValidator = {
 *   "@type": {
 *       opts: { alias: "type" },
 *       required: true,
 *       defaultValue: "Restaurant",
 *       type: "attribute"
 *   },
 *   "@context": {
 *       opts: { alias: "context" },
 *       required: true,
 *       defaultValue: "http://schema.org",
 *       type: "attribute"
 *   },
 *   "address": {
 *       required: true,
 *       type: "element",
 *       objectOf: {
 *          city: {
 *             required: true,
 *             type: "attribute"
 *          }
 *       }
 *    }
 * }
 * const schema = create(schemaValidator).type().context();
 * const address = schema.address().city("Milan");
 * const isAddressValid = address.valid();
 * const isSchemaValid = schema.valid();
 */

export const valid = (nodeProps) => ({
  valid() {
    const { schemaProps, state } = nodeProps;
    return traverse(state, schemaProps);
  },
});

function traverse(state, schemaProps) {
  return Object.keys(schemaProps).every((key) =>
    check(schemaProps[key], state[key])
  );
}

function check(schemaElm, value) {
  const { required } = schemaElm;
  if (required) {
    if (!isDefined(value)) return false;

    const { type, arrayOf, objectOf } = schemaElm;
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

function checkArrayOf(state, schemaElm) {
  const keysSchema = Object.keys(schemaElm);

  return state.every((value) => {
    const isContained = Object.keys(value).every(
      (item) => keysSchema.indexOf(item) !== -1
    );
    if (!isContained) return false;
    return keysSchema.every((propSchema) =>
      check(schemaElm[propSchema], value[propSchema])
    );
  });
}

function checkObjectOf(state, schemaElm) {
  const keysSchema = Object.keys(schemaElm);
  const keysState = Object.keys(state);

  const isContained = keysState.every(
    (item) => keysSchema.indexOf(item) !== -1
  );

  if (!isContained) return false;

  return keysSchema.every((propSchema) =>
    check(schemaElm[propSchema], state[propSchema])
  );
}
