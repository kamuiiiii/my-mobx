import { observable, reaction } from "..";

describe('reaction', () => {
  let store, callback;

  beforeEach(() => {
    store = observable({ a: 1 });
  })

  test("Reaction works", () => {
    callback = jest.fn();
    reaction(() => store.a, callback);
    expect(callback).toHaveBeenCalledTimes(0);
    store.a = 2;
    expect(callback).toHaveBeenCalledTimes(1);
  })
})