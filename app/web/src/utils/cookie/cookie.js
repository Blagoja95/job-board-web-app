export const getCookie = (name) =>
{
	const nameEQ = name + "=";

	const all = document.cookie.split(';');

	for (let i = 0; i < all.length; i++)
	{
		let c = all[i];
		while (c.charAt(0) == ' ')
		{
			c = c.substring(1, c.length);
		}

		if (c.indexOf(nameEQ) == 0)
		{
			return c.substring(nameEQ.length, c.length);
		}
	}
	return null;
};

/**
 *
 * @param names - cookie IDs in array E.g. [cookieID1, cookieID2, ...]
 *
 * @returns {*[], ['cookieVal1', 'cookieVal2', '...']}
 */
export const getLoginArray = (names) =>
{
	if (!names || names?.length < 1)
	{
		return [];
	}

	let arr = [];

	names.forEach(name =>
	{
		const a = getCookie(name);

		if (a && typeof a === 'string')
		{
			arr.push(a);
		}
	});

	return arr;
};

export const deleteCookie = (name) =>
{
	document.cookie = name + '=; Max-Age=-1'
};