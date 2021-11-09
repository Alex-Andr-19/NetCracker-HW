let header = document.getElementsByTagName('header')[0]
let button = document.getElementById('halloButton')

function removeByIndex(array, index) {
    if (array.length > 1) return [...array.slice(0, index), ...array.slice(index + 1, array.length)]
    return []
}


function removeNewLines(arr) {
    let res = arr

    let i = 0
    while (i !== res.length) {
        let word = res[i]
        if (word.includes('\n')) {
            res = removeByIndex(res, i)
            res.push(...word.split('\n'))
        }

        i++
    }

    return res
}


function clearFromEmpty(arr) {
    let res = arr

    let i = 0
    while (i !== res.length) {
        if (res[i] === '') {
            res = removeByIndex(res, i)
        } else {
            res[i] = res[i].toLowerCase()
        }

        i++
    }

    return res
}


function clearFromSymbols(arr) {
    let res = arr

    let symbols = ['.', ',', '!', '?', ':']

    for (let i = 0; i < res.length; i++) {
        let word = res[i]
        if (symbols.includes(word[word.length - 1])) {
            res[i] = word.slice(0, word.length - 1)
        }
    }

    return res
}


function getWords(string) {
    let res = string.split(' ')

    res = removeNewLines(res)

    res = clearFromEmpty(res)

    res = clearFromSymbols(res)

    return res
}


function createObjCount(arr) {
    let res = {}

    arr.forEach(el => {
        if (res.hasOwnProperty(el)) {
            res[el] += 1
        } else {
            res[el] = 1
        }
    })

    return res
}


function renderRes(obj) {
    let resContainer = document.getElementById('res-container')
    resContainer.innerHTML = ''

    for (let key in obj) {
        let elTag = document.createElement("span")

        elTag.innerText = key + ': ' + obj[key]
        resContainer.append(elTag)
    }
}


function checkTop() {
    let textarea = document.getElementById('test-text').value

    let words = getWords(textarea)

    let wordsObj = createObjCount(words)
    console.log(wordsObj)

    let res = {}

    // get top-3 counts of words
    let maxValues = []
    for (let key in wordsObj) {
        if (maxValues.length < 3) {
            maxValues.push(wordsObj[key])
        } else {
            maxValues.forEach(val => {
                if (val <= wordsObj[key]) {
                    maxValues.pop()
                    maxValues.push(wordsObj[key])
                }
            })
        }

        maxValues = maxValues.sort().reverse()
    }

    while (maxValues.length !== 0) {
        for (let key in wordsObj) {
            if (wordsObj[key] === maxValues[0] &&
                !res.hasOwnProperty(key)) {
                res[key] = maxValues[0]

                maxValues = removeByIndex(maxValues, 0)
                break
            }
        }
    }

    renderRes(res)

    console.log(res)
}


let message = 'Hallo, world!!!\n@by '
let msgFromEvListen = '\nfrom EventListener'
let msgFromOnClick = '\nfrom js OnClick'
let captPhr = '\n#CAPTURE_PHRASE'
let bubblingPhr = '\n#BUBBLING_PHRASE'

button.onclick = function() { alert(message + 'Button' + msgFromOnClick) }

header.addEventListener('click', function() { alert(message + 'Header' + msgFromEvListen + captPhr) }, true)
header.addEventListener('click', function() { alert(message + 'Header' + msgFromEvListen + bubblingPhr) })
button.addEventListener('click', function() { alert(message + 'Button' + msgFromEvListen) })