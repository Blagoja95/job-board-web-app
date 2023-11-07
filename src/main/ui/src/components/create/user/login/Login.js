import {EMPTY_FUNCTION, displayBanner, hideBanner} from "../../../../utils/util/utils";
import Button from "../../../button/Button";
import {useContext} from "react";
import {LoginContext} from "../../../../App";
import {BannerContext} from "../../../../App";
import {useNavigate} from "react-router-dom";
import {getLoginArray} from '../../../../utils/cookie/cookie';

const handleSubmit = (e, setLogged, nav, setBanner) =>
{
	e.preventDefault();

	const params = new URLSearchParams();
	const username = document.getElementsByName("username")[0]['value'];

	params.append('username', username);
	params.append('password', document.getElementsByName("password")[0]['value']);

	fetch('http://localhost:8080/login', {
		method: "POST",
		body: params,
		credentials: 'include'
	})
		.then(res => res.json())
		.then(data =>
		{
			if (data?.login?.status === 1)
			{
				console.log(getLoginArray(['username', 'userID']))
				setLogged(getLoginArray(['username', 'userID']));
				displayBanner({
					msg: `Welcome ${username ? username : 'back'}`,
					type: 'success'
				}, setBanner);

				setTimeout(() =>
				{
					nav('/posts');
				}, 500);
			}

			if (data?.login?.status === 0)
			{
				// Something went wrong!
				setLogged([]);
				displayBanner({
					msg: data.login?.info?.length > 0 ? data.login.info : 'Došlo je do greške!',
					type: 'error'
				}, setBanner);
			}
		})
	//     .catch(e => {
	//     displayBanner({
	//         msg: (e ? e : 'Došlo je do greške!'),
	//         type: 'error'
	//     }, setBanner);
	// })
};

const Login = () =>
{
	const {setLogged} = useContext(LoginContext);
	const setBanner = useContext(BannerContext);

	const nav = useNavigate();

	return (
		<div className="h-[60vh]">
			<form
				className="w-96 m-auto flex flex-col gap-5 mt-20 logForm "
				onSubmit={(e) => handleSubmit(e, setLogged, nav, setBanner)}
			>
				<h3 className="text-mint">Prijava</h3>
				<input type="text" placeholder="Korisničko ime" name="username"
					   className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"
					   required minLength={4}/>
				<input type="password" placeholder="Lozinka" name="password"
					   className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"
					   required minLength={4}/>
				<p className="lgn-status hidden">Content</p>

				<Button
					text={"Prijavi se"}
					className={"mr-2 bg-mint text-wht"}
					type="submit"
					onClick={EMPTY_FUNCTION}
				/>
			</form>

			<div className={"flex flex-row justify-center mt-10"}>
				Niste registrovani? Napravite novi <span className="text-mint ml-1 cursor-pointer"
														 onClick={() => nav('/register')}>Nalog</span>
			</div>
		</div>
	);
};

export default Login;