let globalNavigateTo = null;

export const setGlobalNavigateTo = (navigateFn) => {
  globalNavigateTo = navigateFn;
};

export const navigateTo = (...args) => {
  if (globalNavigateTo) {
    globalNavigateTo(...args);
  } else {
    // fallback in case global not set (e.g., SSR or delay)
    window.location.href = args[0];
  }
};
