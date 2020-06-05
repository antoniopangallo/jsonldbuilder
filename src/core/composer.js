export const composer = (props) => {
  // console.log("composer ", props);
  const obj = Object.keys(props).reduce((acc, key) => {
    const { type, defaultValue } = props[key];
    acc = {
      ...acc,
      [key]: function (value) {
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

const props = {
  "@context": {
    required: true,
    defaultValue: "http://schema.org",
    type: "attribute",
  },
  openingHoursSpecification: {
    required: true,
    type: "element",
    arrayOf: {
      dayofWeek: {
        required: true,
        defaultValue: "http://schema.org",
        type: "attribute",
      },
      opens: {
        required: true,
        defaultValue: "http://schema.org",
        type: "attribute",
      },
      closes: {
        required: true,
        defaultValue: "http://schema.org",
        type: "attribute",
      },
    },
  },
  address: {
    required: true,
    type: "element",
    objectOf: {
      "@type": {
        required: true,
        defaultValue: "PostalAddress",
        type: "attribute",
      },
      city: {
        required: true,
        defaultValue: "Milano",
        type: "attribute",
      },
      closes: {
        required: true,
        defaultValue: "http://schema.org",
        type: "attribute",
      },
    },
  },
};
