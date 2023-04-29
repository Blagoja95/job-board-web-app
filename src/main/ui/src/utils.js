import ReactDOM from 'react-dom/client';

export const openMail = (mail) => {

	window.location.href = 'mailto:' + mail;
};

export const EMPTY_FUNCTION = () => { };