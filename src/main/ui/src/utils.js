export const openMail = (mail) => {
	window.location.href = 'mailto:' + mail;
};

export const blurRoot = (state = false) => {
	document.getElementById('root')?.add('blur-lg');
};

export const unBloorRoot = () => {
	document.getElementById('root')?.remove('blur-lg');
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
	return items.filter((item, index) => items.indexOf(item) === index);
};