import {getCookie} from "../cookie/cookie";

export const openMail = (mail) =>
{
	window.location.href = 'mailto:' + mail;
};

export const blurRoot = () =>
{
	document.getElementById('root')?.classList?.add('blur-lg');
};

export const unBloorRoot = () =>
{
	(document.getElementById('root'))?.classList?.remove('blur-lg');
};

export const EMPTY_FUNCTION = () =>
{
};

let debounceId = null; // uff

export const debounce = (fn, timeout = 500) =>
{

	return (...args) =>
	{
		clearTimeout(debounceId);
		debounceId = setTimeout(() =>
		{
			fn.apply(this, args)
		}, timeout);
	};
};

export const removeDuplicates = (items) =>
{
	return items.filter((item, index) => items.indexOf(item) === index);
};

export const displayBanner = (ob, setBanner, autoHide = true) =>
{
	if (!ob || !setBanner)
	{
		return;
	}

	hideBanner(setBanner, 0);

	ob.show = true;

	setBanner(ob);

	if (autoHide)
	{
		hideBanner(setBanner);
	}
};

export const hideBanner = (setBanner, time = 2000) =>
{
	if (time < 1 || !setBanner)
	{
		return;
	}

	setTimeout(() => setBanner({show: false}), time);
};

export const handleDelete = (id, setModal, setBanner, nav, what, text = 'Da li želite obrisati?', fn = null) =>
{
	if (!id || !setModal || !setBanner || !what || typeof what !== 'string' || what.length < 1)
	{
		console.warn('Incorrect use of handleDelete common method.');

		return;
	}

	blurRoot();

	setModal({
		id: id,
		text: text,
		btn1Txt: 'Da',
		btn2Txt: 'Ne',
		btn1Fn()
		{
			unBloorRoot();
			setModal(null);

			fetch('http://localhost:8080/' + what + '?id=' + id, {
				method: 'POST',
				credentials: 'include',
			}).then(res => res.json())
				.then(res =>
				{
					if (fn && typeof fn === 'function')
					{
						fn(res);
					}
				})
				.catch((res) =>
				{
					displayBanner({
						msg: res.message,
						type: 'error'
					}, setBanner);
				});
		},
		btn2Fn()
		{
			unBloorRoot();

			setModal(null);
		}
	})
};

export const checkIfSessionLive = (setBanner = null) =>
{
	const id = getCookie('userID');
	const username = getCookie('username');

	if (!username || typeof username !== 'string' || username.length < 1 || !checkIfNumber(id))
	{
		if (setBanner !== null)
		{
			displayBanner(
				{
					msg: 'Vaša sesija je istekla. Prvo se prijavite!',
					type: 'info'
				},
				setBanner);
		}

		return false;
	}

	return true;
};

export const getID = () =>
{
	const id = getCookie('userID');

	if (checkIfNumber(id))
	{
		return id;
	}

	return null;
};

export const checkIfNumber = (id) =>
{
	return !(!id || isNaN(Number.parseInt(id)));
}