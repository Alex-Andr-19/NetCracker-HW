function Helper(obj) {

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
        for (let key in obj) {
            if (typeof(obj[key]) === 'object') {
                this._toRoot(obj, obj[key])
                delete obj[key]
            }
        }
    }


    this.getByKey = function (obj, searchedKey) {
        let res = null
        for (let key in obj) {
            if (typeof(obj[key]) === 'object') {
                res = this.getByKey(obj[key], searchedKey)
            }
            if (key === searchedKey) {
                return obj[key]
            }
        }
        return res
    }


    this.deepCopy = function (obj) {
        let res = {}

        for (let key in obj) {
            if (typeof(obj[key]) === 'object') {
                res[key] = this.deepCopy(obj[key])
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
        let res = true

        let keyValidator = this._isEqualArray(this._getAllKeys(obj1), this._getAllKeys(obj2))

        if (keyValidator) {
            for (let key in obj1) {
                if (typeof(obj1[key]) === 'object') {
                    res = this.isEqual(obj1[key], obj2[key])
                } else {
                    res = obj1[key] === obj2[key]
                }

                if (!res) break
            }
        }

        return res
    }
}
