
export function Cached() {

    return (target, key, descriptor) => {

        if(!descriptor || (typeof descriptor.value !== 'function')) {
            // throw new TypeError(`Only functions can be decorated with @bind. <${propertyKey}> is not a function!`);
            return;
        }

        return {
            get(this) {

                this.cache || (this.cache = {});
                let original = descriptor.value;

                let modified = function() {
                    return this.cache[key]
                        ? this.cache[key]
                        : this.cache[key] = original.apply(this, arguments);
                };

                Object.defineProperty(this, key, {
                    value: modified,
                    configurable: true,
                    writable: true
                });

                return modified;
            }
        };

    };

}
