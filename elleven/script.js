let time = new Date();
let seconds = Math.floor(time.getTime()/1000)

let timer = document.getElementById('timer')

let logCounter = 1
let customLogger = function (flag, ...args) {
    let resStr = ''
    args.forEach(arg => {
        resStr += (arg + ' ')
    })

    let logger = document.getElementById('logger')
    logger.innerHTML += `${logCounter}\t${flag} --- ${resStr}\n`
    logger.scrollTop += 17

    logCounter += 1
}
console.log = customLogger.bind(console)
let loggingInterval = true

function toggleLoggingInterval() {
    let button = document.getElementById('toggleBtn')
    if (loggingInterval) {
        loggingInterval = false
        button.innerText = 'Continue logging setInterval'
        console.log(logMsg, 'Stop logging setInterval')
    }
    else {
        loggingInterval = true
        button.innerText = 'Stop logging setInterval'
        console.log(logMsg, 'Continue logging setInterval')
    }
}

let logMsg = 'LOG'
let erMsg = 'ERR'
let warMsg = 'WARN'

console.log(logMsg, 'First log')


function timeToValidStr(time) {
    let res = '';

    if (time.hours < 10) res += '0'
    res += (time.hours + ':')
    if (time.min < 10) res += '0'
    res += (time.min + ':')
    if (time.sec < 10) res += '0'
    res += time.sec

    return res
}


function circleSum(min, max, value) {
    if (value >= max) return value - max + min
    else if (value <= min) return value - min + max
    return value
}


function secondsToClock() {
    let time = {
        sec: seconds % 60,
        min: Math.floor( seconds / 60 ) % 60,
        hours: circleSum( 0, 24, Math.floor( seconds / 3600 ) % 24 + 3)
    }

    return time
}


function successColumn(list, num) {
    for (let i = 0; i < list.length; i++) {
        list[i].children[num].classList.add('success')
    }
}


function drawBoard() {
    let loadBoard = document.getElementById('loadBoard').children
    console.log(logMsg, 'Draw started by Promise')

    let drawBoard = new Promise((res, rej) => {
        successColumn(loadBoard, 0);
        setTimeout(console.log(logMsg, 'Drawing in progress', 0), 1000)
        res(true);
    })
        .then(res => {
            successColumn(loadBoard, 1)
            setTimeout(console.log(logMsg, 'Drawing in progress', 1), 1000)
            // res(true);
        })
        .then(res => {
            successColumn(loadBoard, 2)
            setTimeout(console.log(logMsg, 'Drawing in progress', 2), 1000)
            // res(true);
        })
        .then(res => {
            successColumn(loadBoard, 5)
            setTimeout(console.log(logMsg, 'Drawing in progress', 5), 1000)
            // res(true);
        })
        .then(res => {
            successColumn(loadBoard, 4)
            setTimeout(console.log(logMsg, 'Drawing in progress', 4), 1000)
            // res(true);
        })
        .then(res => {
            successColumn(loadBoard, 3)
            setTimeout(console.log(logMsg, 'Drawing in progress', 3), 1000)
            // res(true);
        })
        .catch(rej => {
            console.log(erMsg, 'Something wrong')
        })
        .finally(() => {
            console.log(logMsg, 'Drawing finished')
        })
}



console.log(logMsg, 'Start the setInterval')

timer.innerText = timeToValidStr(secondsToClock());
setInterval(() => {
    seconds += 1;
    timer.innerText = timeToValidStr(secondsToClock());

    if (loggingInterval) console.log('LOG', '< setInterval >')
}, 1000);
