import React from 'react';
import { observer } from 'mobx-react';
import store from '../store';
const Foo = () => {
  return (
    <>
      <h1>b={store.b}</h1>
      <button onClick={() => store.b++}>b++</button>
    </>
  );
};
export default observer(Foo);