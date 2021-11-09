'use strict'

// ===== PART I ===== //

/*
* ----- DESCRIPTION -----
* This function will be work with any
* objects which inherites from Array.
* It will make your Array unique.
* -----------------------
*
* @return:
*   - type: {Array}
*   - meaning: Unique values from root {Array}
*
* */

Object.prototype.unique = function () {
    for (let i = 0; i < this.length; i++) {
        for (let j = 0; j < i; j++) {
            if (this[i] === this[j]) {
                this[j] = null
                break
            }
        }
    }

    return this.filter(el => el !== null);
}

console.log([1, 2, 2, 3, 4, 2, 1, 1, 5, 4, 5, 3, 7, 2].unique());

// ================== //


// ===== PART II ===== //

/*
* ----- DESCRIPTION -----
* function for help to inherit from ParentClass
* -----------------------
*
* @return:
*   - type: {function}
*   - meaning: constructor function, that inherited
*              from ParentClass
*
* */
function inherit(ParentClass) {
    function ChildClass() {}
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
    ChildClass.prototype._super = ParentClass.prototype;
    return ChildClass;
}

/*
* ----- DESCRIPTION -----
* root class
* -----------------------
* */
function MyOwnObj() {}
MyOwnObj.prototype.init = function(a, b, c, _default=10) {
    this.a = a;
    this.b = b;
    this.c = c;

    this.default = _default;
}
MyOwnObj.prototype.d = function() {
    return (this.a - this.b) * this.default;
}

let moo = new MyOwnObj();
moo.init(1, 21, 321);
console.log(moo.d())

/*
* ----- DESCRIPTION -----
* child class
* -----------------------
* */
let Child = inherit(MyOwnObj);
Child.prototype.init = function(a, b ,c) {
    this._super.init.call(this, a, b ,c, 100)
}

// TESTING
let child = new Child();
child.init(1, 12, 123)
console.log(child.d())

// =================== //