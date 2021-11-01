function strangeFunc() {
	try {
		return 1
	} catch (er) {
		console.log(er)
		return 2
	} finally {
		return 3
	}

}

console.log(strangeFunc())