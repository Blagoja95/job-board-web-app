import Button from "../components/Button";
import NavItem from "../components/NavItem";

import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {LoginContext, BannerContext} from "../App";
import {deleteCookie} from '../cookie'
import {displayBanner} from "../utils";

const navItemsText = [
	{text: "Poslovi", href: "/posts"},
	{text: "Kompanije", href: "/users"},
	{text: "Recenzije", href: "/reviews"},
	{text: "Informacije", href: "/about"}];

const Navigation = () =>
{
	const nav = useNavigate();
	const {logged, setLogged} = useContext(LoginContext);
	const setBanner = useContext(BannerContext)

	return (
		<>
			{/* MOBILE */}
			<div className="mobile py-8 md:hidden">

				{/* mobile menu */}
				<div className="register flex flex-col items-center">

					<div className="flex">
						<Button text={"Objavi oglas"} className={"mr-2 bg-mint text-wht"} onClick={() =>
						{
							if (logged.length > 0)
							{
								nav('/npost');
							}
							else
							{
								nav('/login');
							}
						}
						}/>
						{
							logged.length > 0 ?
								<Button text={"Odjavi se"} onClick={() =>
								{
									const user = logged ? logged[0] : '';

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
										});
								}}/>
								:
								<Button text={"Prijava"} onClick={() => nav('/login')}/>
						}
					</div>

					<div className="flex flex-col mt-10 text-center">
						{
							navItemsText.map(item => <NavItem text={item.text} href={item.href} key={item.href}/>)
						}
					</div>

				</div>
			</div>

			{/* laptop */}
			<div className="hidden md:flex flex-row justify-evenly items-center py-8 px-24 md:px-6 md:justify-evenly">
				<div className="image"><span className="text-mint">Trebaš posao?</span></div>

				<div className="w-2/6 flex flex-row justify-around align-center">
					{
						navItemsText.map(item => <NavItem text={item.text} href={item.href} key={item.href}/>)
					}
				</div>

				<div className="register">
					<Button text={"Objavi oglas"} className={"mr-2 bg-mint text-wht"} onClick={() =>
					{
						if (logged.length > 0)
						{
							nav('/npost');
						}
						else
						{
							nav('/login');
						}
					}
					}/>

					{
						logged.length > 0 ?
							<Button text={"Odjavi se"} onClick={() =>
							{

								fetch("http://localhost:8080/logout", {
									method: 'POST',
									credentials: 'include'
								}).then(res => res.json())
									.then(data =>
									{
										if (data?.logout?.status === 1)
										{
											const user = logged ? logged[0] : '';
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
									});


							}}/> :
							<Button text={"Prijava"} onClick={() => nav('/login')}/>
					}
				</div>
			</div>
		</>
	)
};

export default Navigation;