// @ts-check


/**
 * @template T
 * @implements {AsyncIterable<T>}
 */
export class Stream {
  /**
   * @template T
   * @param {(next: ((value: T) => void)) => void} producer
   */
  static fromProducer(producer) {
    /** @type {Stream<T>} */
    const stream = new Stream();
    producer((value) => {
      const resolve = stream.#resolveNext;
      stream.#promise = new Promise((resolve) => {
        stream.#resolveNext = resolve;
      });
      resolve(value);
    });
    return stream;
  }

  /**
   * @template T
   * @param {() => AsyncGenerator<T>} generator
   * @returns {Stream<T>}
   */
  static fromGenerator(generator) {
    return Stream.fromProducer(async (next) => {
      for await (const value of generator()) {
        next(value);
      }
    });
  }

  constructor() {
    this.#promise = new Promise((resolve) => {
      this.#resolveNext = resolve;
    });
  }

  /** @type {(value: T) => void} */
  #resolveNext;

  /** @type {Promise<T>} */
  #promise;

  [Symbol.asyncIterator]() {
    return {
      next: async () => {
        return { done: false, value: await this.#promise };
      },
    };
  }
}
