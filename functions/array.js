export function affixCallbackToArray(array, callback) {
    chainPush(array, (arg)=>{
        callback(arg);
        return arg;
    });
}

export function blockPush(array, ...filters) {
    chainPush(array, (arg)=>{
        return [arg].filter(filterWith(...filters))[0]; //we can use 0 because arg is a single el
    });
}

export function filterWith(...filters) {
    return function filter(arg) {
        return filters.reduce((a,b)=>a&&b(arg), true);
    };
}

function chainPush(array, func) {
    forceArray(array);

    const oldPush = array.push;
    const tempArr = [];
    tempArr.oldPush = oldPush;

    array.push = function(arg) {
        tempArr.oldPush(arg);
        Array.prototype.push.apply(this, tempArr.map(func).filter(identity));
        tempArr.length = 0;
    }
}

function identity(a) {
    return a;
}

function forceArray(array) {
    if (!array instanceof Array) {
        throw new Error("not an array");
    }
}