class Logger {
	
	constructor(logLevel) {
		this.logLevels = ["DEBUG", "OFF"];
		if (this.logLevels.includes(logLevel)) {
			this.logLevel = logLevel;
			this.logs = [];
			this.callerFile = "";
			this.callerFunction = "";
		} else {
			throw new Exception("Log level cannot be interpreted");
		}
	}
	
	get count() {
		return this.logs.length;
	}
	
	setCallerInfo(filename, funcName) {
		this.callerFunction = funcName;
		this.callerFile = filename;
	}
	
	log(message) {
		if (this.logLevel == "DEBUG") {
			let something = arguments;
			let timestamp = new Date().toISOString();
			this.logs.push({ message, timestamp });
			console.log(timestamp + ": " + this.callerFile + " " + this.callerFunction + ": " + message);
		}
	}
	
}

module.exports = new Logger("DEBUG");