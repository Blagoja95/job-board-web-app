import {EMPTY_FUNCTION, debounce} from "../utils";
import Button from "./Button";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../App";
import {useNavigate} from "react-router-dom";
import {getLoginArray} from "../cookie";

const handleSubmit = (e, setLogged, nav) => {
	e.preventDefault();

	const params = new URLSearchParams();
	const form = document.querySelector('.regForm');

	for (let item of form.elements)
		if (item['name'] !== 'skip')
		{
			params.append(item['name'], item.value);
		}

	fetch('http://localhost:8080/register', {
		method: "POST",
		credentials: 'include',
		body: params
	})
		.then(res => res.json())
		.then(data => {
			if (data?.register?.status === 1)
			{
				setLogged(getLoginArray(['username', 'userID']));

				nav('/posts');

				const inner = document.querySelector('.forInner');

				inner.insertAdjacentHTML('beforeend', `
											<p class="py-4 text-mint text-2xl">${data?.register?.info ? data?.register?.info : 'Welcome!'}</p>`);
				setTimeout(() => {
					while (inner.firstChild) inner.removeChild(inner.firstChild);
				}, 2000);
			}
			else {
				const inner = document.querySelector('.forInner');

				inner.insertAdjacentHTML('beforeend', `
											<p class="py-4">${data?.register?.info ? data?.register?.info : 'Error!'}</p>`);
				setTimeout(() => {
					while (inner.firstChild) inner.removeChild(inner.firstChild);
				}, 2000);
			}
		})
};

export const checkPassword = (val) => {
	const passInp = document.getElementsByName('password').item(0);

	if (!passInp || !val)
	{
		return false;
	}
	else
	{
		return val.value === val;
	}
};

const Register = () => {
	const {setLogged} = useContext(LoginContext);

	const nav = useNavigate();

	// const [passStatus, setPassStatus] = useState(null);
	//
	// useEffect(() => {
	// 	switch (passStatus)
	// 	{
	//
	// 		case null:
	// 		{
	// 			break;
	// 		}
	//
	// 		case true:
	// 		{
	// 			const passInp = document.getElementsByName('password');
	//
	// 			passInp.forEach(item => {
	// 				console.log(item, 'good');
	// 			});
	//
	// 			break;
	// 		}
	//
	// 		case false: {
	// 			const passInp = document.getElementsByName('password');
	//
	// 			passInp.forEach(item => {
	// 				console.log(item, 'bad');
	// 			});
	//
	// 			break;
	// 		}
	//
	// 	}
	//
	// }, );

	return (
		<div className="">
			<form
				className="regForm w-96 m-auto flex flex-col gap-5 mt-6"
				onSubmit={(e) => handleSubmit(e, setLogged, nav)}
			>
				<h3 className="text-mint">Registracija</h3>
				<input required minLength={4} type="text" placeholder="Ime kompanije" name='name'
					   className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>
				<input required minLength={4} type="text" placeholder="Korisničko ime" name='username'
					   className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>
				<input required minLength={4} type="text" placeholder="Grad" name='city'
					   className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>
				<input required minLength={4} type="email" placeholder="Mejl adresa" name='email'
					   className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>

				<textarea placeholder="O kompaniji" name='about'
						  className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>

				<input required minLength={4} name='password' type="password" placeholder="Unesi lozinku"
					   className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>
				{/*<input required minLength={4} name='password' type="password" placeholder="Potvrdi lozinku"*/}
				{/*	   onChange={(e) => setPassStatus(debounce(checkPassword)(e.target.value))}*/}
				{/*	   className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>*/}

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