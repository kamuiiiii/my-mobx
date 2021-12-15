import React from "react";
import { observer } from "mobx-react";
import { useCallback } from "react";
import store from "./store";
import Foo from "./components/Foo";

function App() {

  const handle = useCallback(() => {
    store.a += 1;
  }, [])

  return (
    <>
      <h1>{store.a}</h1>
      <button onClick={handle}>Store change</button>
      {store.b < 5 ? <Foo /> : null}
    </>
  );
}

export default observer(App);
