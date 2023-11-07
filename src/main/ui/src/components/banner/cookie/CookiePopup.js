import React, {useState, useEffect} from 'react';
import Button from "../../button/Button";
import {blurRoot, unBloorRoot} from "../../../utils/util/utils";

const CookiePopup = () =>
{
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() =>
	{
		const isCookieAccepted = localStorage.getItem('cookieAccepted');

		if (!isCookieAccepted)
		{
			setIsVisible(true);
		}
	}, []);

	const acceptCookies = () =>
	{
		localStorage.setItem('cookieAccepted', 'true');
		setIsVisible(false);
	};

	return (
		<div className={`fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 ${isVisible ? 'block' : 'hidden'}`}>
			<div className="max-w-screen-lg mx-auto flex items-center justify-between">
				{/*<p>This website uses cookies to ensure you get the best experience on our website.</p>*/}
				<p>Ova veb lokacija koristi kolačiće kako bismo vam omogućili najbolje iskustvo na našoj veb
					lokaciji.</p>
				<Button onClick={acceptCookies} className="bg-mint" text={'Uredu'}/>
			</div>
		</div>
	);
};

export default CookiePopup;