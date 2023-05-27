export const openMail = (mail) => {

	window.location.href = 'mailto:' + mail;
};

export const blurRoot = () => {
	const root = document.getElementById('root'),
		classes = root.classList;
	console.log(classes.contains('blur-lg'))

	if(classes.contains('blur-lg'))
		classes.remove('blur-lg');
	else
		classes.add('blur-lg');
};

export const EMPTY_FUNCTION = () => { };