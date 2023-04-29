import { EMPTY_FUNCTION } from "../utils";
import Button from "./Button";
import {useContext} from "react";
import {LoginContext} from "../App";
import {useNavigate} from "react-router-dom";

const handleSubmit = (e, setLogged, nav) => {
	e.preventDefault();

	const params = new URLSearchParams();
	const form = document.querySelector('.regForm');

	for (let item of document.querySelector('.regForm').elements ){
		if(item['name'] !== 'skip'){
		params.append(item['name'], item.value);
		}
	}

	fetch('http://localhost:8080/register', {
		method: "POST",
		body: params
	})
		.then(res => res.json())
		.then(data => {
			if(data['success']) {
				localStorage.setItem('login', JSON.stringify(data['success']));
				setLogged(data['success']);
				nav('/posts');
			}
		})
};

const Register = () => {
	const {setLogged} = useContext(LoginContext);

	const nav = useNavigate();

	return (
		<div className="">
			<form
				className="regForm w-96 m-auto flex flex-col gap-5 mt-6"
				onSubmit={(e) => handleSubmit(e, setLogged, nav)}
			>
				<h3 className="text-mint">Registracija</h3>
				<input required minLength={4} type="text" placeholder="Ime kompanije" name='name' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />
				<input required minLength={4} type="text" placeholder="Korisničko ime" name='username' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />
				<input required minLength={4} type="text" placeholder="Grad" name='city' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />
				<input required minLength={4} type="email" placeholder="Mejl adresa" name='email' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />

				<textarea placeholder="O kompaniji" name='about' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />

				<input required minLength={4} name='password' type="password" placeholder="Lozinka" className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />

				<Button
					text={"Registruj se"}
					className={"mr-2 my-4 bg-mint text-wht"}
					name={"skip"}
					type="submit"
					onClick={EMPTY_FUNCTION}
				/>
			</form>
		</div>
	);
};

export default Register;