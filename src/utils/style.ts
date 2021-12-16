export function getStyleProperty(element: HTMLElement, property: string, fallback = '') {
    const value =  getComputedStyle(element).getPropertyValue(property);
    return value || fallback;
}