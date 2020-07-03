export const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
export const oneDay = 86400000;


export const addDateFormatting = (str) => {
	let retVal = str.split(' ');
	return retVal[0] + ', ' + retVal[1] + ' ' + formatDay(retVal[2]);
}
export const currentTimeString = () => {
    let retVal = (new Date(Date.now())).toDateString().slice(0, 10);
    return addDateFormatting(retVal);
}
export const tomorrowTimeString = () => {
    let retVal = (new Date(Date.now() + oneDay)).toDateString().slice(0, 10);
    return addDateFormatting(retVal);
}
export const currentISOTime = () => {
	return (new Date(Date.now() - timezoneOffset)).toISOString().slice(0, 16);
}
export const tomorrowISOTime = () => {
	return (new Date(Date.now() - timezoneOffset + getTimeDelta(1))).toISOString().slice(0, 16);
}
export const soonISOTime = () => {
	return (new Date(Date.now() - timezoneOffset + getTimeDelta(2))).toISOString().slice(0, 16);
}
export const getTimeDelta = (days=0, hours=0, minutes=0, seconds=0) => {
	return (((days * 24 + hours) * 60 + minutes) * 60 + seconds) * 1000;
}

export const formatDay = (day) => {
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

export const formatDate = (date) => {
	let dateObj = new Date(new Date(date) + timezoneOffset);
    return addDateFormatting(dateObj.toDateString());
    //let datePieces = dateObj.toDateString().split(' ');
	//return datePieces[0] + ', ' + datePieces[1] + ' ' + formatDay(datePieces[2]);
};

export const formatTime = (time) => {
	if (time != '') {
		let hour = parseInt(time.split(':')[0]);
		let minutes = time.split(':')[1];
		if (hour > 12) return hour - 12 + ':' + minutes + ' PM';
		return time + ' AM';
	} 
	return '';
};

export const months31 = [ 'January', 'March', 'May', 'July', 'August', 'October', 'December'];
export const months30 = ['April', 'June', 'September', 'November'];
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];