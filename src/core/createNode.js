import { applySchema } from "./applySchema";
import { att } from "./att";
import { valid } from "./valid";
import { ele } from "./ele";
import { children } from "./children";
import { firstChild } from "./firstChild";
import { lastChild } from "./lastChild";
import { next } from "./next";
import { prev } from "./prev";
import { up } from "./up";
import { get } from "./get";
import { stringify } from "./stringify";
import { root } from "./root";

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
    ...ele(stateNode, createNode),
    ...att(stateNode),
    ...children(stateNode),
    ...firstChild(stateNode),
    ...lastChild(stateNode),
    ...root(stateNode),
    ...prev(stateNode),
    ...next(stateNode),
    ...up(stateNode),
    ...get(stateNode),
    ...stringify(stateNode),
    ...valid(stateNode),
  };
}
