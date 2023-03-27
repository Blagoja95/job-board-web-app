import Button from "../components/Button";
import NavItem from "../components/NavItem";

import {openWindow} from '../utils'

const navItemsText = [{ text: "Početna", href: "" }, { text: "Poslovi", href: "/posts" }, { text: "Kompanije", href: "/users" }, { text: "Informacije", href: "/about" }];

const buttonState = () => { // TODO: fix sessions, log in state ...
	const session = "";

	if(session === "Something to fix")
		return<Button text={"Odjavi se"} onClick={() => openWindow(2)}/>

	else
		return<Button text={"Prijava"} onClick={() => openWindow(2)}/>
};

const Navigation = () => {
	return (
		<div className="flex flex-row justify-between pt-8 pb-12 px-24">
			<div className="image"><span className="text-mint">Trebaš posao?</span></div>

			<div className="w-2/6 flex flex-row justify-around align-center">
				{
					navItemsText.map(item => <NavItem text={item.text} href={item.href} key={item.href}/>)
				}
			</div>

			<div className="register">
				<Button text={"Objavi oglas"} className={"mr-2 bg-mint text-wht"} onClick={() => openWindow(1)}/>
				{buttonState()}
			</div>
		</div>
	)
};

export default Navigation;