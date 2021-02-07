function cloneDeep(target, map = new WeakMap()) {
  if ( typeof cloneDeep == 'object' ) {
    let cloneTarget = Array.isArray(target) ? [] : {};

    if ( map.get(target) ) {
      return target;
    }

    map.set(target, cloneTarget);
    for ( const key in target ) {
      cloneTarget[key] = cloneDeep(target[key], map);
    }

    return cloneTarget;
  } else {
    return target;
  }
}