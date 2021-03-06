import {
  fullscreenEnabled,
  requestFullScreen as $requestFullScreen,
  exitFullScreen as $exitFullScreen,
  isFullScreen as $isFullScreen,
  onFullScreenChange as $onFullScreenChange
} from "./polyfills";

let __isFullScreen = false;
const __callbacks: (() => void)[] = [];

export const requestFullScreen = fullscreenEnabled ? $requestFullScreen : () => {
  window.parent.postMessage({type: "fake-fullscreen", value: true}, location.origin);

  if (!__isFullScreen) {
    __isFullScreen = true;
    for (const _ of __callbacks) _();
  }
};

export const exitFullScreen = fullscreenEnabled ? $exitFullScreen : () => {
  window.parent.postMessage({type: "fake-fullscreen", value: false}, location.origin);

  if (__isFullScreen) {
    __isFullScreen = false;
    for (const _ of __callbacks) _();
  }
};

export const isFullScreen = fullscreenEnabled ? $isFullScreen : () => {
  return __isFullScreen;
};

export const onFullScreenChange = fullscreenEnabled ? $onFullScreenChange : (callback: () => void) => {
  __callbacks.push(callback);
};
