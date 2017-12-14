"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const directive_js_1 = require("../../core/updater/content/directive.js");
function observe(value$) {
    return new Observe(value$);
}
exports.observe = observe;
class Observe extends directive_js_1.Directive {
    constructor(value$) {
        super();
        this.value$ = value$;
    }
    /**
     * @param {ContentUpdater} updater
     */
    update(updater) {
        if (typeof updater.oldValue === 'function') {
            updater.oldValue();
        }
        const subscribtion = this.value$.subscribe((litTag) => {
            updater.update([litTag]);
        });
        return subscribtion;
    }
}
exports.Observe = Observe;
class ValueStream {
    constructor(value) {
        this.value = value;
        this.subscribers = [];
    }
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
        subscriber(this.value);
        return () => this.subscribers.splice(this.subscribers.indexOf(subscriber), 1);
    }
    /**
     * @param {Subscriber} subscriber
     */
    map(mapper) {
        const stream = new ValueStream();
        this.subscribe((val) => {
            stream.emit(mapper(val));
        });
        return stream;
    }
    /**
     * @param {Val} value
     */
    emit(value) {
        this.value = value;
        const length = this.subscribers.length;
        for (let index = 0; index < length; index++)
            this.subscribers[index](value);
    }
}
exports.ValueStream = ValueStream;
