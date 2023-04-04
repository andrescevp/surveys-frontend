const debounce = (callback, wait) => {
    let timeoutId: number|undefined = undefined;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        // eslint-disable-next-line prefer-spread, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        callback.apply(null, args);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      }, wait);
    };
  }

export default debounce
