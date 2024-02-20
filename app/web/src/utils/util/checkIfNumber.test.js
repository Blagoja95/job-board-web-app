import {checkIfNumber} from './utils';

it('Check if input value is number', function ()
{
	expect(checkIfNumber(1)).toStrictEqual(true);
	expect(checkIfNumber(null)).toStrictEqual(false);
	expect(checkIfNumber('111')).toStrictEqual(true);
	expect(checkIfNumber('equal112s')).toStrictEqual(false);
	expect(checkIfNumber('#_1234')).toStrictEqual(false);
	expect(checkIfNumber('123_111')).toStrictEqual(true);
	expect(checkIfNumber('a123_111')).toStrictEqual(false);
	expect(checkIfNumber('')).toStrictEqual(false);
	expect(checkIfNumber(undefined)).toStrictEqual(false);
	expect(checkIfNumber({})).toStrictEqual(false);
	expect(checkIfNumber([])).toStrictEqual(false);
	expect(checkIfNumber(['12'])).toStrictEqual(true);
	expect(checkIfNumber([['12']])).toStrictEqual(true);
	expect(checkIfNumber({number: '12'})).toStrictEqual(false);
});