import { EMPTY_FUNCTION} from "../utils";
import Button from "./Button";
import {useNavigate} from "react-router-dom";

const handleSubmit = (e, nav) => {
	e.preventDefault();

	const params = new URLSearchParams();
	const form = document.querySelector('.nPostForm');

	for (let item of form.elements)
		if(item['name'] !== 'skip')
			params.append(item['name'], item.value);

	params.set('companyID', JSON.parse(localStorage.getItem('login'))[1])

	fetch('http://localhost:8080/posts', {
		method: "POST",
		body: params
	})
		.then(res => res.json())
		.then(data => {
			if(data['success']) {
				nav('/posts'); // TODO: switch to detailed post
			}
		})
};

const CreatePost = () => {
	const nav = useNavigate();

	return (
		<div className="h-[60vh] flex flex-col">
				<h3 className="text-mint text-center">Objavi oglas</h3>
			<form
				className="nPostForm w-96 m-auto flex flex-col gap-5 mt-6"
				onSubmit={e => handleSubmit(e, nav)}
			>
				<input required minLength={4} type="text" placeholder="Naslov" name='title' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />
				<input required minLength={4} type="text" placeholder="Angažmana" name='type' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />
				<input required minLength={4} type="text" placeholder="Grad" name='city' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />
				<textarea required minLength={4} placeholder="Kvalifikacije" name='qual' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />

				<textarea required minLength={4} placeholder="Detalji o poslu" name='about' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />

				<Button
					text={"Objavi"}
					className={"mr-2 my-4 bg-mint text-wht"}
					type="submit"
					name={"skip"}
					onClick={EMPTY_FUNCTION}
				/>
			</form>
		</div>
	);
};

export default CreatePost;