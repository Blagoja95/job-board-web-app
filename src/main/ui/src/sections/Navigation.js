import Button from "../components/Button";
import NavItem from "../components/NavItem";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../App";

const navItemsText = [{ text: "Početna", href: "/" }, { text: "Poslovi", href: "posts" }, { text: "Kompanije", href: "/users" }, { text: "Informacije", href: "/about" }];

const Navigation = () => {
	const nav = useNavigate();
	const { logged, setLogged } = useContext(LoginContext);

	return (
		<>
			{/* MOBILE */}
			<div className="mobile pt-8 px-12 md:hidden">

				{/* mobile menu */}
				<div className="register flex  flex-col items-center">

					<div className="flex">
						<Button text={"Objavi oglas"} className={"mr-2 bg-mint text-wht"} onClick={() => {
							if (logged.length > 0)
								nav('/npost');
							else
								nav('/login');
						}
						} />

						{
							logged.length > 0 ?
								<Button text={"Odjavi se"} onClick={() => {
									const user = logged ? logged[0] : '';
									setLogged([]);
									localStorage.removeItem('login');

									const inner = document.querySelector('.forInner');

									inner.insertAdjacentHTML('beforeend', `
						<p class="py-4"> Hvala na posjeti
						<span class="text-mint">${user}</span>!
						</p>`);

									setTimeout(() => {
										while (inner.firstChild) inner.removeChild(inner.firstChild);
									}, 2000);

								}} /> :
								<Button text={"Prijava"} onClick={() => nav('/login')} />
						}
					</div>

					<div className="flex flex-col mt-10 text-center">
						{
							navItemsText.map(item => <NavItem text={item.text} href={item.href} key={item.href} />)
						}
					</div>

					</div>
			</div>

			{/* laptop */}
			<div className="hidden md:flex flex-row justify-between pt-8 pb-12 px-24 md:px-6 md:justify-evenly">
				<div className="image"><span className="text-mint">Trebaš posao?</span></div>

				<div className="w-2/6 flex flex-row justify-around align-center">
					{
						navItemsText.map(item => <NavItem text={item.text} href={item.href} key={item.href} />)
					}
				</div>

				<div className="register">
					<Button text={"Objavi oglas"} className={"mr-2 bg-mint text-wht"} onClick={() => {
						if (logged.length > 0)
							nav('/npost');
						else
							nav('/login');
					}
					} />

					{
						logged.length > 0 ?
							<Button text={"Odjavi se"} onClick={() => {
								const user = logged ? logged[0] : '';
								setLogged([]);
								localStorage.removeItem('login');

								const inner = document.querySelector('.forInner');

								inner.insertAdjacentHTML('beforeend', `
						<p class="py-4"> Hvala na posjeti
						<span class="text-mint">${user}</span>!
						</p>`);

								setTimeout(() => {
									while (inner.firstChild) inner.removeChild(inner.firstChild);
								}, 2000);

							}} /> :
							<Button text={"Prijava"} onClick={() => nav('/login')} />
					}
				</div>
			</div>
		</>
	)
};

export default Navigation;