import { observable, autorun } from "..";

describe('autorun', () => {
  let store, callback;

  beforeEach(() => {
    store = observable({ a: 1, b: { c: 1 }, get d() { return this.a + this.b.c } });
  })

  test("Effect runs once when you create it", () => {
    callback = jest.fn();
    autorun(callback);
    expect(callback).toHaveBeenCalledTimes(1);
  })

  test("Run effect when observable change", () => {
    callback = jest.fn();
    autorun(() => callback(store.a));
    store.a = 2;
    expect(callback).toHaveBeenCalledTimes(2);
  })

  test("Run effect when computed change", () => {
    callback = jest.fn();
    autorun(() => callback(store.d));
    store.a = 2;
    expect(callback).toHaveBeenCalledTimes(2);
  })

  test("Lazy observable", () => {
    callback = jest.fn();
    autorun(() => {
      if (store.a === 2) {
        callback(store.b.c);
      }
    });
    expect(callback).toHaveBeenCalledTimes(0);
    store.b.c = 2;
    expect(callback).toHaveBeenCalledTimes(0);
    store.a = 2;
    expect(callback).toHaveBeenCalledTimes(1);
    store.b.c = 3;
    expect(callback).toHaveBeenCalledTimes(2);
  })
})