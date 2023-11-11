import {displayBanner} from "../../utils/util/utils";
import {useState} from "react";
import {getCookie} from "../../utils/cookie/cookie";
import General from "./types/general/General";

const getID = (setBanner) =>
{
	const id = getCookie('userID');

	if (!id || isNaN(Number.parseInt(id)))
	{
		const jsessionid = getCookie('JSESSIONID');

		if (!jsessionid || jsessionid.length < 1)
		{
			displayBanner(
				{
					msg: 'Vaša sesija je istekla. Prvo se prijavite!',
					type: 'info'
				},
				setBanner);
		}
		else
		{
			displayBanner(
				{
					msg: 'Došlo je do greške!',
					type: 'error'
				},
				setBanner);
		}

		return null;
	}

	return id;
};

const Settings = () =>
{
	const [setting, setSetting] = useState(0);
	let ob = [];

	switch (setting)
	{
		case 0:
			ob = [<General getID={getID} setSetting={setSetting} key='random-key-general-1'/>];
			break;
		case 1:
		case 2:
		default:
			ob = [<General getID={getID} setSetting={setSetting} key='random-key-general-2'/>];
			break;

	}

	return (
		ob
	)
};

export default Settings;