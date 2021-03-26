

/**
 * Config for clone helper
 */
export interface CloneConfig {

    /**
     * Use clone function for nested properties
     */
    deep?: boolean;

    /**
     * Use clone helper method for objects that have it
     */
    helper?: boolean;

}

/**
 * Clone value
 *
 * @param   value   Value to clone
 * @param   config  Configuration for cloning
 * @return          Cloned value
 */
export function clone<T, U = T>(value: T, config?: CloneConfig): U {

    config = config || {};
    config.helper = config.helper !== false;

    // boolean, number, string, undefined or null
    if(typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string' ||
        value === undefined || value === null) {

        return value as any;
    }

    //Object with equals
    if(config.helper && (<any> value).clone) {
        return (<any> value).clone();
    }

    // Date
    if(value instanceof Date) {
        return <any> new Date(value.getTime());
    }

    if(value instanceof Function) {
        //TODO: Implement clone for function
    }

    // Array
    if(value instanceof Array) {
        return <any> (!config.deep ? value.slice() : value.reduce<Array<any>>((r, i) => {
            r.push(i);
            return r;
        }, []));
    }

    // Object
    let cloned: any = {};
    cloned.__proto__ = (<any> value).__proto__;

    if(config.deep) {
        for(let k in value) {
            if(value.hasOwnProperty(k)) {
                cloned[k] = clone(value[k], config);
            }
        }
    } else {
        for(let k in value) {
            if(value.hasOwnProperty(k)) {
                cloned[k] = value[k];
            }
        }
    }

    return cloned;
}
