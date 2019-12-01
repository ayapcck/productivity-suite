class Logger {
	
	constructor(logLevel) {
		this.logLevels = ["DEBUG", "OFF"];
		if (this.logLevels.includes(logLevel)) {
			this.logLevel = logLevel;
			this.logs = [];
		} else {
			throw new Exception("Log level cannot be interpreted");
		}
	}
	
	get count() {
		return this.logs.length;
	}
	
	log(message, callerFile, callerFunction) {
		if (this.logLevel == "DEBUG") {
			let something = arguments;
			let timestamp = new Date().toISOString();
			let date = timestamp.split('T')[0];
			let time = timestamp.split('T')[1];
			this.logs.push({ message, timestamp });
			console.log(date + " " + time + ": " + callerFile + " " + callerFunction + ": " + message);
		}
	}
	
}

module.exports = new Logger("DEBUG");