"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!Symbol.observable)
    Symbol.observable = Symbol('@@observable');
class Subscription {
    constructor(unsubscribe, getClosed = () => false) {
        this.unsubscribe = unsubscribe;
        this.getClosed = getClosed;
    }
    get closed() {
        return this.getClosed();
    }
}
exports.Subscription = Subscription;
class SubscriptionObserver {
    constructor(
        // Sends the next value in the sequence
        next, 
        // Sends the sequence error
        error, 
        // Sends the completion notification
        complete, 
        // A boolean value indicating whether the subscription is closed
        getClosed) {
        this.next = next;
        this.error = error;
        this.complete = complete;
        this.getClosed = getClosed;
    }
    get closed() {
        return this.getClosed();
    }
}
exports.SubscriptionObserver = SubscriptionObserver;
function isFn(testObject) {
    return typeof testObject === 'function';
}
class Observable {
    constructor(subscriber) {
        this.subscriber = subscriber;
    }
    static of(...items) {
        const Obs = isFn(this) ? this : Observable;
        return new Obs((observer) => {
            const length = items.length;
            for (let index = 0; index < length; index++) {
                observer.next(items[index]);
            }
            return () => { };
        });
    }
    static from(any) {
        if (any == undefined)
            throw new TypeError();
        const Obs = isFn(this) ? this : Observable;
        if (Array.isArray(any)) {
            return Observable.of(...any);
        }
        return new Obs((observer) => {
            if (any instanceof Observable) {
                const subscribtion = any.subscribe(observer);
                return () => subscribtion.unsubscribe();
            }
            return () => { };
        });
    }
    subscribe(observerOrNext, errorFn, completeFn) {
        let status = 2;
        let cleanup = () => { };
        let observer = {
            next() { }
        };
        if (typeof observerOrNext === 'function') {
            observer.next = observerOrNext;
            observer.error = errorFn;
            observer.complete = completeFn;
        }
        else
            observer = observerOrNext;
        const subscribtionObserver = new SubscriptionObserver((value) => {
            if (isFn(observer.next))
                observer.next(value);
        }, (errorVal) => {
            status = 1;
            unsubscribe();
            if (isFn(observer.error))
                observer.error(errorVal);
            else
                throw errorVal;
        }, () => {
            status = 0;
            unsubscribe();
            if (isFn(observer.complete))
                observer.complete();
        }, () => {
            return status !== 2;
        });
        try {
            cleanup = this.subscriber(subscribtionObserver);
        }
        catch (error) {
            subscribtionObserver.error(error);
        }
        if (!cleanup)
            cleanup = () => { };
        else if (isFn(cleanup['unsubscribe']))
            cleanup = cleanup['unsubscribe'];
        if (status !== 2 && isFn(cleanup)) {
            unsubscribe();
        }
        function unsubscribe() {
            if (status === 2)
                return status = -1;
            if (isFn(cleanup))
                cleanup();
        }
        const subscription = new Subscription(unsubscribe, () => status !== 2);
        if (isFn(observer.start)) {
            observer.start(subscription);
        }
        return subscription;
    }
    [Symbol.observable]() {
        return this;
    }
}
exports.Observable = Observable;
