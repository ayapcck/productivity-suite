import { currentTimeString, tomorrowTimeString } from '../utilities/dates.js';

export const tabHeaders = [{
	name: 'Today',
	getValue: () => currentTimeString()
}, {
	name: 'Tomorrow',
	getValue: () => tomorrowTimeString()
}, {
	name: 'Soon',
	getValue: () => ''
}];


export const initialElementDicts = () => {
	let elements = {};
	tabHeaders.map(value => {
		let tabName = value.name;
		elements[tabName] = {};
	});
	elements['Completed'] = {};
	return elements;
};