(function () {
    /**
     * @template {keyof HTMLElementTagNameMap} K
     * @param {K} tagName 
     * @param {Array<Attr|Node|SiEvent>} [props]
     * @returns {HTMLElementTagNameMap[K]}
     */
    function el(tagName, props) {
        var element = document.createElement(tagName);
        props.forEach(function (prop) {
            if (prop instanceof Attr) {
                element.attributes.setNamedItem(prop);
            } else if (prop instanceof Node) {
                element.appendChild(prop);
            } else if (prop instanceof SiEvent) {
                prop.attach(element);
            }
        });
        return element;
    }
    /**
     * @param {string} data 
     */
    function tx(data) {
        return document.createTextNode(data);
    }
    /**
     * @param {string} localName 
     * @param {string} value 
     */
    function at(localName, value) {
        var attr = document.createAttribute(localName);
        attr.value = value;
        return attr;
    }
    /**
     * @template {keyof HTMLElementEventMap} K
     * @param {K} type
     * @param {(this: HTMLElement, ev: HTMLElementEventMap[K]) => any} listener
     * @param {boolean | AddEventListenerOptions} [options]
     * @returns {SiEvent}
     */
    function ev(type, listener, options) {
        return new SiEvent(type, listener, options);
    }
    /**
     * @constructor
     * @template {keyof HTMLElementEventMap} K
     * @param {K} type
     * @param {(this: HTMLElement, ev: HTMLElementEventMap[K]) => any} listener
     * @param {boolean | AddEventListenerOptions} [options]
     */
    function SiEvent(type, listener, options) {
        this.type = type;
        this.listener = listener;
        this.options = options;
        /** @type {Array<HTMLElement>} */
        this.elements = [];
    }
    /**
     * @param {HTMLElement} element
     */
    SiEvent.prototype.attach = function (element) {
        element.addEventListener(this.type, this.listener, this.options);
        this.elements.push(element);
    };
    /**
     * @param {(this: HTMLElement, ev: HTMLElementEventMap[K]) => any} listener
     * @param {boolean | AddEventListenerOptions} [options]
     */
    SiEvent.prototype.setListener = function (listener, options) {
        var type = this.type;
        var oldListener = this.listener;
        this.elements.forEach(function (element) {
            element.removeEventListener(type, oldListener);
        });
        this.elements.forEach(function (element) {
            element.addEventListener(type, listener, options);
        });
        this.listener = listener;
        this.options = options;
    };
    window.el = el;
    window.at = at;
    window.ev = ev;
    window.tx = tx;
})();
