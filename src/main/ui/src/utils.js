export const openMail = (mail) => {
    window.location.href = 'mailto:' + mail;
};

export const blurRoot = () => {
	document.getElementById('root')?.classList?.add('blur-lg');
};

export const unBloorRoot = () => {
	(document.getElementById('root'))?.classList?.remove('blur-lg');
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

export const displayBanner = (ob, setBanner, autoHide = true) => {
    if (!ob || !setBanner) {
        return;
    }

    ob.show = true;

    setBanner(ob);

    if (autoHide) {
        hideBanner(setBanner);
    }
};

export const hideBanner = (setBanner, time = 2000) => {
    if (time < 1 || !setBanner) {
        return;
    }

    setTimeout(() => setBanner({show: false}), time);
}