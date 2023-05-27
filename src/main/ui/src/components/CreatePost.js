import {blurRoot, EMPTY_FUNCTION} from "../utils";
import Button from "./Button";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {DetailContext, ModalContext} from "../App";

const CreatePost = ({create}) => {
	const nav = useNavigate();
	const {detailed, setDetailed} = useContext(DetailContext);
	const {modal, setModal} = useContext(ModalContext);

	// TODO: next method is a temp solution
	const clearFields = () => {
		const form = document.querySelector('.nPostForm');

		for (let item of form.elements)
			if (item['name'] !== 'skip')
				item.value = '';
	};

	const handleSubmit = (e, nav) => {
		e.preventDefault();

		const params = new URLSearchParams();
		const form = document.querySelector('.nPostForm');

		for (let item of form.elements)
			if (item['name'] !== 'skip')
				params.append(item['name'], item.value);


		if (!create)
			params.set('id', detailed?.id);
		else
			params.set('companyID', JSON.parse(localStorage.getItem('login'))[1]);

		fetch(`http://localhost:8080/${!create ? 'update' : 'posts'}`, {
			method: "POST",
			body: params
		})
			.then(res => res.json())
			.then(data => {
				if (data['success']) {
					nav('/detailed?id=' + data['success']);
				}
			});
	};

	const common = () => {
		blurRoot();
		setModal(null);
	};

	if (create) {
		setDetailed(null);
		clearFields();
	}

	return (
		<div className="h-[60vh] flex flex-col">
			<h3 className="text-mint text-center">{!detailed ? "Objavi oglas" : "Uredi oglas"}</h3>
			<form
				className="nPostForm w-96 m-auto flex flex-col gap-5 mt-6"
				onSubmit={e => {
					e.preventDefault();

					if(create)
						handleSubmit(e, nav);

					if(!create) {
						common();

						setModal({
							text: "Da li ste sigurni da želite urediti ovaj oglas?",
							btn1Txt: "Da",
							btn2Txt: "Ne",
							btn1Fn() {
								common();
								handleSubmit(e, nav);
							},
							btn2Fn() {
								common();
							}
						});
					}
				}}
			>
				<input required minLength={4} type="text" placeholder="Naslov" name='title'
				       defaultValue={detailed?.title ? detailed?.title : ''}
				       className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>
				<input required minLength={4} type="text" placeholder="Angažmana" name='type'
				       defaultValue={detailed?.type ? detailed?.type : ''}
				       className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>
				<input required minLength={4} type="text" placeholder="Grad" name='city'
				       defaultValue={detailed?.city ? detailed?.city : ''}
				       className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>
				<textarea required minLength={4} placeholder="Kvalifikacije" name='qual'
				          defaultValue={detailed?.qual ? detailed?.qual : ''}
				          className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>

				<textarea required minLength={4} placeholder="Detalji o poslu" name='about'
				          defaultValue={detailed?.about ? detailed?.about : ''}
				          className="border border-coolGray-light outline-none p-1 pl-4 rounded-xl hover:border-airForceBlue focus:border-mint"/>

				<Button
					text={create ? "Objavi" : "Uredi"}
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