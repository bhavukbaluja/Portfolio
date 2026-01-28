let currentZIndex = 1500;

export function getNextZIndex() {
  return currentZIndex += 2; // +2 each time for Popup and Backdrop
}
