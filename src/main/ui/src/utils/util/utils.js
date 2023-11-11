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

export const handleDelete = (id, setModal, setBanner, nav, what, text = 'Da li želite obrisati?') =>
{
	if (!id || !setModal || !setBanner || !what || typeof what !== 'string' || what.length < 1 )
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
				method: 'DELETE'
			}).then(res => res.json())
				.then(res =>
				{
					if (res?.posts?.status === 1)
					{
						displayBanner({
							msg: res?.posts?.info ?? 'Oglas uspješno obrisan!',
							type: 'success'
						}, setBanner);

						setTimeout(() =>
						{
							nav('/');
						}, 500);
					}
					else
					{
						displayBanner({
							msg: res.post?.info ?? 'Došlo je do greške!',
							type: 'error'
						}, setBanner);
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