var timeLogger = console.log.bind(console)

console.log = function (...args) {
    let date = new Date()
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December ']
    let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    timeLogger(`${weekDays[date.getDay()]} - ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ===`,
        ...args)
}

console.log('Test')