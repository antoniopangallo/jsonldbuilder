## Installation:

``` sh
npm install jsonldbuilder
```

## Initialization

create()
A JSON-LD document is created by calling the create function.

Documentation: [https://antoniopangallo.github.io/jsonldbuilder/](https://antoniopangallo.github.io/jsonldbuilder/)

### Usage with schema:

``` js
import create from "jsonldbuilder"

const schemaValidator = {
    "@type": {
        opts: { alias: "type" },
        required: true,
        defaultValue: "AutoDealer",
        type: "attribute",
    },
    "@context": {
        opts: { alias: "context" },
        required: true,
        defaultValue: "http://schema.org",
        type: "attribute",
    },
    address: { 
        required: true,
        type: "element",
        objectOf: {
            "@type": {
                opts: { alias: "type" },
                required: true,
                defaultValue: "PostalAddress",
                type: "attribute",
            },
            city: {
                required: true,
                defaultValue: "Milano",
                type: "attribute",
            },
            zip: {
                required: true,
                defaultValue: "12345",
                type: "attribute",
            }
        }
    },
    other: {
        required: true,
        type: "element",
        arrayOf: {
            a: {
                required: true,
                type: "attribute",
            },
            b: {
                required: true,
                type: "attribute",
            },
            c: {
                required: true,
                type: "attribute",
            }
        }
    }
}

const schema = create(schemaValidator);
schema.type();
schema.context();
const address = schema.address();
address.type();
address.city();
address.zip();


const other = schema.other();
other.a("otherA");
other.b("otherB");
other.c("otherC");

const other1 = schema.other();
other.a("other1A");
other.b("other1B");
other.c("other1C");
```

will result in:

``` json
{   
    "@type":"AutoDealer",
    "@context":"http://schema.org",
    "address": { 
        "@type":"PostalAddress",
        "city":"Milano",
        "zip":"12345"
    },
    "other": [ 
        {"a": "otherA", "b": "otherB", "c": "otherC"}, 
        {"a": "other1A", "b": "other1B", "c": "other1C"} 
    ]
}
```

### Usage without schema:

```javascript
import create from "jsonldbuilder"

const schema = create();
schema.att("@type", "AutoDealer");
schema.att("@context", "AutoDealer");

const address = schema.ele("address");
address.att("@type", "PostalAddress");
address.att("city", "MI");
address.att("zip", "123");

const other = schema.ele("other");
other.att("a", "otherA");
other.att("b", "otherB");
other.att("c", "otherC");

const other1 = schema.ele("other");
other.att("a", "other1A");
other.att("b", "other1B");
other.att("c", "other1C");
```

will result in:

``` json
{   
    "@type":"AutoDealer",
    "@context":"http://schema.org",
    "address": { 
        "@type":"PostalAddress",
        "city":"Milano",
        "zip":"12345"
    },
    "other": [ 
        {"a": "otherA", "b": "otherB", "c": "otherC"}, 
        {"a": "other1A", "b": "other1B", "c": "other1C"} 
    ]
}
```