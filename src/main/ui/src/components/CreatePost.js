import { EMPTY_FUNCTION, closeWindow } from "../utils";
import Button from "./Button";

const handleSubmit = (e) => {
	e.preventDefault();

	closeWindow();
};
// TODO: probably will need id to place in hidden fields
const CreatePost = () => {
	return (
		<div className="h-[60vh]">
			<form
				action="/createPost"
				method="POST"
				className="w-96 m-auto flex flex-col gap-5 mt-6"
				onSubmit={handleSubmit}
			>
				<h3 className="text-mint">Objavi oglas</h3>
				<input type="hidden" value="userId" name="companyID" />
				<input type="text" placeholder="Naslov" name='title' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />
				<input type="text" placeholder="Angažmana" name='type' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />
				<input type="text" placeholder="Grad" name='city' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />
				<textarea placeholder="Kvalifikacije" name='qual' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />

				<textarea placeholder="Detalji o poslu" name='about' className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint" />

				<Button
					text={"Objavi"}
					className={"mr-2 my-4 bg-mint text-wht"}
					type="submit"
					onClick={EMPTY_FUNCTION}
				/>
			</form>
		</div>
	);
};

export default CreatePost;