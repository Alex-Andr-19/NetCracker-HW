function Helper() {

    this.isObject = function(obj) {
        return typeof(obj) === 'object'
    }


    this.isEmpty = function (obj) {
        if (!this._validateArg(obj)) return null
        return this.isEqual(obj, {})
    }


    this.hasKey = function (obj, targetKey) {
        let res = false
        if (!this._validateArg(obj)) return res


        for (let key in obj) {
            if (typeof(obj[key]) === 'object') {
                res = this.hasKey(obj[key], targetKey)
            } else {
                res = key === targetKey
            }

            if (res) {
                break
            }
        }

        return res
    }


    this._validateArg = function (obj) {
        if (!this.isObject(obj)) {
            console.error('Argument is not an object!')
            return false
        }

        return true
    }

    this._toRoot = function(root, obj) {
        for (let key in obj) {
            if (typeof(obj[key]) === 'object') {
                this._toRoot(root, obj[key])
            } else {
                // console.log('Set ' + key + ' to Root')
                root[key] = obj[key]
            }
        }

        obj = null
    }

    this.toPale = function (obj) {
        if (!this._validateArg(obj)) return

        for (let key in obj) {
            if (typeof(obj[key]) === 'object') {
                this._toRoot(obj, obj[key])
                delete obj[key]
            }
        }
    }


    this.findValue = function (obj, searchedKey) {
        let res = null
        if (!this._validateArg(obj)) return res

        for (let key in obj) {
            if (typeof(obj[key]) === 'object') {
                if (!res) res = this.findValue(obj[key], searchedKey)
            } else if (key === searchedKey) {
                res = obj[key]
            }
        }
        return res
    }


    this.deepClone = function (obj) {
        if (!this._validateArg(obj)) return

        let res = {}

        for (let key in obj) {
            if (typeof(obj[key]) === 'object') {
                res[key] = this.deepClone(obj[key])
            } else {
                res[key] = obj[key]
            }
        }

        return res
    }


    this._getAllKeys = function (obj) {
        let res = []

        for (let key in obj) {
            if (typeof(obj[key]) === 'object') {
                res.push(key+'{', ...this._getAllKeys(obj[key]),'}')
            } else {
                res.push(key)
            }
        }

        return res
    }

    this._isEqualArray = function (arr1, arr2) {
        if (arr1.length !== arr2.length) return false

        let result = arr1.every(function (element) {
            return arr2.includes(element);
        });

        return result
    }

    this.isEqual = function (obj1, obj2) {
        if (!this._validateArg(obj1) || !this._validateArg(obj2)) return null

        let res = false

        let keyValidator = this._isEqualArray(this._getAllKeys(obj1), this._getAllKeys(obj2))

        if (keyValidator) {
            for (let key in obj1) {
                if (typeof(obj1[key]) === 'object') {
                    res = this.isEqual(obj1[key], obj2[key])
                } else {
                    res = obj1[key] === obj2[key]
                }

            }

            if (this._getAllKeys(obj1).length === 0) res = true
        }



        return res
    }
}


let helper = new Helper()

var mainObj = {
    a: 1,
    b: 2,
    c: {
        d: 4,
        e: {
            e1: 5,
            e2: 6,
            e3: 7
        },
        f: 8
    },
    g: 9,
    h: {
        first: 'hallo',
        second: ', world!'
    }
}

var copyObj = {}


console.log('DEBUG == mainObj isObject: ' + helper.isObject(mainObj))
console.log('DEBUG == copyObj isObject: ' + helper.isObject(copyObj))
console.log('DEBUG == mainObj:')
console.log(mainObj)
console.log('DEBUG == copyObj:')
console.log(copyObj)
console.log('-------------------------')

console.log('DEBUG == copyObj isEmpty: ' + helper.isEmpty(copyObj))
console.log('-------------------------')

console.log('INFO  == Copying mainObj to copyObj')
copyObj = helper.deepClone(mainObj)
console.log('DEBUG == copyObj:')
console.log(copyObj)
console.log('DEBUG == isEqual mainObj and copyObj: ' + helper.isEqual(mainObj, copyObj))
console.log('-------------------------')

console.log('DEBUG == is copyObj hasKey \'e2\' : ' + helper.hasKey(copyObj, 'e2'))
console.log('DEBUG == get from mainObj value by key \'e2\' : ' + helper.findValue(mainObj, 'e2'))
console.log('-------------------------')

console.log('INFO  == let toPale newMainObj')
let newMainObj = helper.deepClone(mainObj)
helper.toPale(newMainObj)
console.log('DEBUG == newMainObj:')
console.log(newMainObj)
console.log('DEBUG == isEqual newMainObj and copyObj: ' + helper.isEqual(mainObj, copyObj))

console.log(helper.isEmpty(mainObj))