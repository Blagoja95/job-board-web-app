import { EMPTY_FUNCTION} from "../utils";
import Button from "./Button";
import { useContext } from "react";
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";

const handleSubmit = (e, setLogged, nav) => {
	e.preventDefault();

	const params = new URLSearchParams();

	params.append('username', document.getElementsByName("username")[0]['value']);
	params.append('password', document.getElementsByName("password")[0]['value']);

	fetch('http://localhost:8080/login', {
		method: "POST",
		body: params
	})
		.then(res => res.json())
		.then(data => {
			if (data?.login?.success?.length === 2)
			{
				localStorage.setItem('login', JSON.stringify(data.login.success));
				setLogged(data.login.success);
				nav('/posts');
			}

			// TODO: fail state
		})
};

const Login = () => {
	const { setLogged } = useContext(LoginContext);

	const nav = useNavigate();

	return (
		<div className="h-[60vh]">
			<form
				className="w-96 m-auto flex flex-col gap-5 mt-20 logForm"
				onSubmit={(e) => handleSubmit(e, setLogged, nav)}
			>
				<h3 className="text-mint">Prijava</h3>
				<input type="text" placeholder="Korisničko ime" name="username" className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" required minLength={4} />
				<input type="password" placeholder="Lozinka" name="password" className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" required minLength={4} />

				<Button
					text={"Prijavi se"}
					className={"mr-2 bg-mint text-wht"}
					type="submit"
					onClick={EMPTY_FUNCTION}
				/>
			</form>

			<div className={"flex flex-row justify-center mt-10"}>
				Niste registrovani? Napravite novi <span className="text-mint ml-1 cursor-pointer" onClick={() => nav('/register')}>Nalog</span>
			</div>
		</div>
	);
};

export default Login;