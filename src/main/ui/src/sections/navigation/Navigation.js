import Button from "../../components/button/Button";
import NavItem from "./NavItem";

import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {LoginContext, BannerContext} from "../../App";
import {deleteCookie, getCookie} from '../../utils/cookie/cookie'
import {displayBanner} from "../../utils/util/utils";
import {getAvatar} from "../../components/useravatar/getAvatar/getAvatar";
import Menu from "../../components/menu/Menu";

const navItemsText = [
	{text: "Poslovi", href: "/posts"},
	{text: "Kompanije", href: "/users"},
	{text: "Recenzije", href: "/reviews"},
	{text: "Informacije", href: "/about"}
];

const logout = (logged, setLogged, setBanner, nav) =>
{
	if (!logged || !setBanner || !setLogged)
	{
		return;
	}

	fetch("http://localhost:8080/logout", {
		method: 'POST',
		credentials: 'include'
	})
		.then(res => res.json())
		.then(data =>
		{
			if (data?.logout?.status === 1)
			{
				setLogged([]);
				deleteCookie('username');
				deleteCookie('userID');

				displayBanner({
					type: 'success',
					msg: 'Hvala na posjeti'
				}, setBanner);
			}
			else
			{
				setLogged([]);
				deleteCookie('username');
				deleteCookie('userID');

				displayBanner({
					type: 'error',
					msg: data?.info ? data.info : 'Došlo je do greške!'
				}, setBanner);
			}

			nav('/')
		})
		.catch((res) =>
		{
			displayBanner({
				msg: res.message,
				type: 'error'
			}, setBanner);
		});
};

const Navigation = () =>
{
	const nav = useNavigate();
	const {logged, setLogged} = useContext(LoginContext);
	const setBanner = useContext(BannerContext);
	const [menuVisible, setMenuVisible] = useState(false);

	return (
		<>
			{/* MOBILE */}
			<div className="mobile py-8 md:hidden">

				{/* mobile menu */}
				<nav className="register flex flex-col items-center">

					<div className="flex">
						<Button text={"Objavi oglas"} className={"mr-2 bg-mint text-wht"} onClick={() =>
						{
							if (logged.length > 0)
							{
								nav('/npost');
							}
							else
							{
								displayBanner({
									type: 'info',
									msg: 'Prvo se prijavite!'
								}, setBanner);

								nav('/login');
							}
						}
						} key='some21321rqand-key'/>
						{
							logged.length > 0 ?
								<Button text={"Odjavi se"} onClick={() =>
								{
									fetch('http://localhost:8080/logout', {
										method: 'POST',
										credentials: 'include'
									})
										.then(res => res.json())
										.then(data =>
										{
											if (data?.logout?.status === 1)
											{
												setLogged([]);
												deleteCookie('username');
												deleteCookie('userID');

												displayBanner({
													type: 'success',
													msg: 'Hvala na posjeti'
												});

												console.log('out')
												nav('/posts');
											}

											if (data?.logout?.status === 0)
											{
												displayBanner({
													type: 'error',
													msg: data?.info ? data.info : 'Došlo je do greške!'
												});
											}
										})
										.catch((res) =>
										{
											displayBanner({
												msg: res.message,
												type: 'error'
											}, setBanner);
										});
								}} key='some12sds1231rqand-key'/>
								:
								<Button text={"Prijava"} onClick={() => nav('/login')}
										key='some2sdasdq123wrqand-key'/>
						}
					</div>

					<ul className="flex flex-col mt-10 text-center">
						{
							navItemsText.map(item => <NavItem text={item.text} href={item.href}
															  key={item.text + '-' + Math.random() * Math.E * 1995}/>)
						}
					</ul>

				</nav>
			</div>

			{/* laptop */}
			<nav
				className="hidden md:flex flex-row justify-evenly items-center py-8 px-24 md:px-6 md:justify-evenly">
				<div className="image"><span className="text-mint">Trebaš posao?</span></div>

				<div className="w-2/6 flex flex-row justify-around align-center">
					{
						navItemsText.map(item => <NavItem text={item.text} href={item.href}
														  key={item.text + '-' + Math.random() * Math.E * 1995}/>)
					}
				</div>

				<div className="register flex gap-2 items-center">
					{
						logged.length > 0 ?
							[
								<Button text={"Objavi oglas"} className={"mr-2 bg-mint text-wht max-h-[50px]"}
										onClick={() =>
										{
											if (logged.length > 0)
											{
												nav('/npost');
											}
											else
											{
												displayBanner({
													type: 'info',
													msg: 'Prvo se prijavite!'
												}, setBanner);

												nav('/login');
											}
										}
										} key='some21123esd21321rqand-key'/>,

								<div onClick={() => setMenuVisible(!menuVisible)}
									 key='somera213dom312key'
									 className='border-2 border-mint hover:cursor-pointer hover:border-green-400 rounded-full relative active:scale-95'>
									{getAvatar({name: getCookie('username')}, 'rounded-full text-mint')}

									{menuVisible ? <Menu fn={() => logout(logged, setLogged, setBanner, nav)}/> : <></>}
								</div>
							]
							:
							[
								<Button text={"Registracija"} className={"bg-mint text-wht"}
										onClick={() => nav('/register')} key='some21321rqand-key123'/>,
								<Button text={"Prijava"} onClick={() => nav('/login')}
										key='some21321rqa2223snd-key'/>
							]
					}
				</div>
			</nav>
		</>
	)
};

export default Navigation;