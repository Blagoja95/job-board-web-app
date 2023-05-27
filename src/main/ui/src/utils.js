export const openMail = (mail) => {

	window.location.href = 'mailto:' + mail;
};

export const blurRoot = () => {
	const root = document.getElementById('root'),
		blur = root.style.filter;

	root.style.filter = blur ? '' : 'blur(16px)';
};

export const EMPTY_FUNCTION = () => { };