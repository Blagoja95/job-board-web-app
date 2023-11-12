import {checkIfSessionLive, displayBanner, getID} from "../../utils/util/utils";
import {useContext, useEffect, useState} from "react";
import General from "./types/general/General";
import {BannerContext} from "../../App";
import {useNavigate, useNavigation} from "react-router-dom";
import NoSettings from "./types/NoSettings";

export const getUser = (id, setUser, setBanner) =>
{
	if (!id || typeof id !== 'string' || id.length < 1)
	{
		return;
	}

	fetch('http://localhost:8080/users?id=' + id)
		.then(response => response.json())
		.then(data =>
		{
			console.log(data)
			setUser(...data?.users ?? null);
		})
		.catch((res) =>
		{
			displayBanner({
				msg: res.message,
				type: 'error'
			}, setBanner);
		});
};

const Settings = () =>
{
	const [setting, setSetting] = useState(0);
	const [user, setUser] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const setBanner = useContext(BannerContext);

	let ob = [];

	useEffect(() =>
	{
		if(!loaded && checkIfSessionLive())
		{
			getUser(getID(), setUser, setBanner);

			setLoaded(true);
		}
	}, []);

	switch (setting)
	{
		case 0:
			ob = [<General setSetting={setSetting} user={user} key='random-key-general-1'/>];
			break;
		case 1:
		case 2:
		case 3:
			ob = [<NoSettings fn={()=> setSetting(0)} key='random-no-setting-key-1'/>];
			break;
		default:
			ob = [<General setSetting={setSetting} user={user} key='random-key-general-2'/>];
			break;

	}

	return (
		ob
	)
};

export default Settings;