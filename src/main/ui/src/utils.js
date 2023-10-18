export const openMail = (mail) => {
	window.location.href = 'mailto:' + mail;
};

export const blurRoot = () => {
	const root = document.getElementById('root'),
		classes = root.classList;

	if (classes.contains('blur-lg'))
	{
		classes.remove('blur-lg');
	}
	else
	{
		classes.add('blur-lg');
	}
};

export const EMPTY_FUNCTION = () => { };

let debounceId = null; // uff

export const debounce = (fn, timeout = 500) => {

	return (...args) => {
		clearTimeout(debounceId);
		debounceId = setTimeout(() => {
			fn.apply(this, args)
		}, timeout);
	};
};

export const removeDuplicates = (items) => {
	return items.filter((item,index) => items.indexOf(item) === index);
};