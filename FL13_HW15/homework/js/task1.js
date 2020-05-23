function assign(target) {
  const to = Object(target);
  for (let i = 1; i < arguments.length; i++) {
    let nextSource = arguments[i];
    const keysArray = Object.keys(Object(nextSource));

    for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      let nextKey = keysArray[nextIndex];
      if (to.hasOwnProperty(nextKey)) {
        continue;
      }
      to[nextKey] = nextSource[nextKey];
    }
  }
  return to;
}