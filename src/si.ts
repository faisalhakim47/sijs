type Prop<T> = Node|((element: T) => (Node|void));

export function re<E extends HTMLElement>(
    element: E,
    props: Array<Prop<E>>|((element: E) => Array<Prop<E>>) = [],
): E  {
    const childs = typeof props === 'function' ? props(element) : props;
    childs.forEach((child) => {
        const prop = typeof child === 'function' ? child(element) : child;
    });
    return element;
}

export function el<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    props: Array<Prop<HTMLElementTagNameMap[K]>>|((element: HTMLElementTagNameMap[K]) => Array<Prop<HTMLElementTagNameMap[K]>>) = [],
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tagName);
    const childs = typeof props === 'function' ? props(element) : props;
    childs.forEach((child) => {
        const prop = typeof child === 'function' ? child(element) : child;
        if (prop instanceof Attr) {
            element.attributes.setNamedItemNS(prop);
        } else if (prop instanceof Node) {
            element.appendChild(prop);
        }
    });
    return element;
}

export function at(localName: string, value: string): Attr {
    const attr = document.createAttribute(localName);
    attr.value = value;
    return attr;
}

export function tx(text: string): Text {
    return document.createTextNode(text);
}

export function ev<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
) {
    return (element: HTMLElement) => {
        element.addEventListener(type, listener.bind(element), options);
    };
}
