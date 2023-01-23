export const currencyFormatter = new Intl.NumberFormat(undefined, {
	currency: 'pln',
	style: 'currency',
	minimumFractionDigits: 0,
});

export const disableSpaceKeyDown = (e) => {
	if (e.key === ' ') {
		e.preventDefault();
	}
};
export const disableSpaceChange = (e) => {
	if (e.currentTarget.value.includes(' ')) {
		e.currentTarget.value = e.currentTarget.value.replace(/\s/g, '');
	}
};
export const handlePhoneInput = (e) => {
	const value = e.currentTarget.value;
	const number = value.replace(/[^\d]/g, '');
	if (number.length < 4) return (e.currentTarget.value = number);
	if (number.length < 7)
		return (e.currentTarget.value = `${number.slice(0, 3)} ${number.slice(
			3,
		)}`);
	return (e.currentTarget.value = `${number.slice(0, 3)} ${number.slice(
		3,
		6,
	)} ${number.slice(6, 9)}`);
};

export const isNumber = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

export const isArrayValues = (arr) => Array.isArray(arr) && arr.length > 0;
