export interface CancelablePromise<T> {
  promise: Promise<T>;

  hasCanceled(): boolean;

  cancel(): void;
}

export const makeCancelable = <T>(promise: Promise<T>): CancelablePromise<T> => {
  let hasCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(
      (val) => (hasCanceled ? reject({isCanceled: true}) : resolve(val)),
      (error) => (hasCanceled ? reject({isCanceled: true}) : reject(error)),
    );
  });

  return {
    promise: wrappedPromise,
    hasCanceled: () => hasCanceled,
    cancel() {
      hasCanceled = true;
    },
  };
};
