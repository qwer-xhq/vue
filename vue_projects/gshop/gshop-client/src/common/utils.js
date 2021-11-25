// 防抖函数
export function debounce(func, delay) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    }, delay);
  }
}

// 节流函数
export function throtte(func, delay) {
  let activeTime = 0;
  return function () {
    const current = Date.now();
    if (current - activeTime > delay) {
      func.apply(this, arguments);
      activeTime = Date.now();
    }
  };
}