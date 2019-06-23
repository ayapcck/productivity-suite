const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
const oneDay = 86400000;


const addDateFormatting = (str) => {
	let retVal = str.split(' ');
	return retVal[0] + ', ' + retVal[1] + ' ' + formatDay(retVal[2]);
}
const currentTimeString = () => {
    let retVal = (new Date(Date.now() - timezoneOffset)).toDateString().slice(0, 10);
    return addDateFormatting(retVal);
}
const tomorrowTimeString = () => {
    let retVal = (new Date(Date.now() - timezoneOffset + oneDay)).toDateString().slice(0, 10);
    return addDateFormatting(retVal);
}

const formatDay = (day) => {
	let retVal = day[0] === '0' ? day.slice(1) : day; 
	let lastDigit = day[day.length - 1];
	if (lastDigit === '1' && day !== '11') {
		return retVal + 'st';
	} else if (lastDigit === '2' && day !== '12') {
		return retVal + 'nd';
	} else if (lastDigit === '3' && day !== '13') {
		return retVal + 'rd';
	} else {
		return retVal + 'th';
	}
};

const formatDate = (date) => {
	let dateObj = new Date(new Date(date) + timezoneOffset);
    return addDateFormatting(dateObj.toDateString());
    //let datePieces = dateObj.toDateString().split(' ');
	//return datePieces[0] + ', ' + datePieces[1] + ' ' + formatDay(datePieces[2]);
};

const formatTime = (time) => {
	if (time != '') {
		let hour = parseInt(time.split(':')[0]);
		let minutes = time.split(':')[1];
		if (hour > 12) return hour - 12 + ':' + minutes + ' PM';
		return time + ' AM';
	} 
	return '';
};

export { currentTimeString, tomorrowTimeString, formatDay, formatDate, formatTime };