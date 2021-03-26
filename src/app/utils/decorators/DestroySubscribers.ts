
import {Subscriber} from "rxjs";

export function DestroySubscribers() {

    return function (target: any) {
        target.prototype.ngOnDestroy = ngOnDestroyDecorator(target.prototype.ngOnDestroy);

        function ngOnDestroyDecorator(f) {

            return function () {
                let superData = f ? f.apply(this, arguments) : null;

                for (let subscriberKey in this.subscribers) {

                    if(this.subscribers.hasOwnProperty(subscriberKey)) {
                        let subscriber = this.subscribers[subscriberKey];

                        if (subscriber instanceof Subscriber) {
                            subscriber.unsubscribe();
                            console.log("unsubscribed: " + subscriberKey);
                        }
                    }

                }

                return superData;
            }
        }

        return target;
    }

}
