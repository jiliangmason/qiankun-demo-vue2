export function proxyEvents() {
    // fix: 点击事件target为shadow元素的问题
const {addEventListener: oldAddEventListener, removeEventListener: oldRemoveEventListener} = document;
const fixEvents = ['click', 'mousedown', 'mouseup'];
const overrideEventFnMap = {};
const setOverrideEvent = (eventName, fn, overrideFn) => {
  if (fn === overrideFn) {
    return;
  }
  if (!overrideEventFnMap[eventName]) {
    overrideEventFnMap[eventName] = new Map();
  }
  overrideEventFnMap[eventName].set(fn, overrideFn);
};
const resetOverrideEvent = (eventName, fn) => {
  const eventFn = overrideEventFnMap[eventName]?.get(fn);
  if (eventFn) {
    overrideEventFnMap[eventName].delete(fn);
  }
  return eventFn || fn;
};
document.addEventListener = (event, fn, options) => {
  const callback = (e) => {
    // 当前事件对象为qiankun盒子，并且当前对象有shadowRoot元素，则fix事件对象为真实元素
    if (e.target.id?.startsWith('__qiankun_microapp_wrapper') && e.target?.shadowRoot) {
      console.log('zyx++', e.composedPath()[0])
      const target = e.composedPath()[0]
      fn({...e, target});
      return;
    }
    fn(e);
  };
  const eventFn = fixEvents.includes(event) ? callback : fn;
  setOverrideEvent(event, fn, eventFn);
  Reflect.apply(oldAddEventListener, document, [event, eventFn, options]);
};
document.removeEventListener = (event, fn, options) => {
  const eventFn = resetOverrideEvent(event, fn);
  Reflect.apply(oldRemoveEventListener, document, [event, eventFn, options]);
};
}