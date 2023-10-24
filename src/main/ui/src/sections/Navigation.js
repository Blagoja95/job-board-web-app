import Button from "../components/Button";
import NavItem from "../components/NavItem";

import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {LoginContext} from "../App";
import {deleteCookie} from '../cookie'

const navItemsText = [
	{text: "Poslovi", href: "/posts"},
	{text: "Kompanije", href: "/users"},
	{text: "Recenzije", href: "/reviews"},
	{text: "Informacije", href: "/about"}];

const Navigation = () => {
	const nav = useNavigate();
	const {logged, setLogged} = useContext(LoginContext);

	return (
		<>
			{/* MOBILE */}
			<div className="mobile py-8 md:hidden">

				{/* mobile menu */}
				<div className="register flex flex-col items-center">

					<div className="flex">
						<Button text={"Objavi oglas"} className={"mr-2 bg-mint text-wht"} onClick={() => {
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
								<Button text={"Odjavi se"} onClick={() => {
									const user = logged ? logged[0] : '';

									fetch('http://localhost:8080/logout', {
										method: 'POST',
										credentials: 'include'
									})
										.then(res => res.json())
										.then(data => {
											if (data?.logout?.status === 1)
											{
												setLogged([]);
												deleteCookie('username');
												deleteCookie('userID');

												const inner = document.querySelector('.forInner');

												inner.insertAdjacentHTML('beforeend', `
												<p class="py-4"> Hvala na posjeti
												<span class="text-mint">${user}</span>!
												</p>`);

												setTimeout(() => {
													while (inner.firstChild) inner.removeChild(inner.firstChild);
												}, 2000);
											}

											if (data?.logout?.status === 0)
											{
												const loginLabel = document.querySelector('.lgn-status');
												loginLabel.innerText = data.logout?.info?.length > 0 ? data.logout.info : 'Something went wrong!'

												setTimeout(() => loginLabel.className = 'lgn-status text-center text-redwood-normal', 100);
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
					<Button text={"Objavi oglas"} className={"mr-2 bg-mint text-wht"} onClick={() => {
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
							<Button text={"Odjavi se"} onClick={() => {

								fetch("http://localhost:8080/logout", {
									method: 'POST',
									credentials: 'include'
								}).then(res => res.json())
									.then(data => {
										if (data?.logout?.status === 1)
										{
											const user = logged ? logged[0] : '';
											setLogged([]);
											deleteCookie('username');
											deleteCookie('userID');

											const inner = document.querySelector('.forInner');

											inner.insertAdjacentHTML('beforeend', `
											<p class="py-4"> Hvala na posjeti
											<span class="text-mint">${user}</span>!
											</p>`);

											setTimeout(() => {
												while (inner.firstChild) inner.removeChild(inner.firstChild);
											}, 2000);
										}
										else
										{
											const inner = document.querySelector('.forInner');

											inner.insertAdjacentHTML('beforeend', `
											<p class="py-4">${data?.login?.info ? data.login.info : 'Error!'}</p>`);

											setLogged([]);
											deleteCookie('username');
											deleteCookie('userID');

											setTimeout(() => {
												while (inner.firstChild) inner.removeChild(inner.firstChild);
											}, 2000);
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