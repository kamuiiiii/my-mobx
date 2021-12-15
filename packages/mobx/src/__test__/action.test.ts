import { observable, autorun, action } from "..";

describe('action', () => {
  let store, callback;

  beforeEach(() => {
    store = observable({ a: 1 });
  })

  test("Not use action", () => {
    callback = jest.fn();
    autorun(() => callback(store.a));
    store.a = 2;
    store.a = 3;
    expect(callback).toHaveBeenCalledTimes(3);
  })

  test("Action works", () => {
    callback = jest.fn();
    autorun(() => callback(store.a));
    const batch = action(() => {
      store.a = 2;
      store.a = 3;
    })
    batch();
    expect(callback).toHaveBeenCalledTimes(2);
  })
})