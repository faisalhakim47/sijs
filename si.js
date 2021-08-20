/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {HTMLElement|K} elementOrTagName 
 * @param {Array<Attr|Node|((element: HTMLElementTagNameMap[K]) => (Attr|Node|void))>} [props]
 * @returns {HTMLElementTagNameMap[K]}
 */
 export function el(elementOrTagName, props) {
    var element = typeof elementOrTagName === 'string'
        ? document.createElement(elementOrTagName)
        : elementOrTagName;
    props.forEach(function (prop) {
        var child = typeof prop === 'function' ? prop(element) : prop;
        if (child instanceof Attr) {
            element.attributes.setNamedItem(child);
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });
    return element;
}

/**
 * @param {string} data 
 */
export function tx(data) {
    return document.createTextNode(data);
}

/**
 * @param {string} localName 
 * @param {string} value 
 */
export function at(localName, value) {
    var attr = document.createAttribute(localName);
    attr.value = value;
    return attr;
}

/**
 * @template {keyof HTMLElementEventMap} K
 * @param {K} type
 * @param {(this: HTMLElement, ev: HTMLElementEventMap[K]) => any} listener
 * @param {boolean | AddEventListenerOptions} [options]
 * @returns {(element: HTMLElement) => void}
 */
export function ev(type, listener, options) {
    return function (element) {
        element.addEventListener(type, listener, options);
    };
}

/**
 * @param {String} html
 * @returns {(element: HTMLElement) => void}
 */
export function ht(html) {
    return function (element) {
        element.innerHTML = html;
    }
}
