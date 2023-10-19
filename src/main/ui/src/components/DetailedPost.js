import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faLocationArrow,
	faLink,
} from "@fortawesome/fontawesome-free-solid";
import Button from "./Button";
import {openMail, blurRoot} from "../utils";
import React, {useContext, useEffect, useState} from "react";
import {DetailContext, ModalContext, LoginContext} from "../App";
import {useNavigate} from "react-router-dom";

const DetaildPost = () => {
	const [loading, setLoading] = useState(true);
	const {setModal} = useContext(ModalContext);
	const {detailed, setDetailed} = useContext(DetailContext);
	const nav = useNavigate();
	const {logged} = useContext(LoginContext);

	useEffect(() => async () => {
		const id = new URLSearchParams(window.location.search).get('id');

		await fetch('http://localhost:8080/posts?id=' + id)
			.then(response => response.json())
			.then(async data => {
				if (!data || data?.results === 0)
				{
					return;
				}

				const post = data.posts[0];
				const user = await fetch('http://localhost:8080/users?id=' + post.companyID)
					.then(response => response.json())
					.then(data => data.users[0]);

				setDetailed({
					...post,
					company: user.name,
					companyAbout: user.about,
					email: user.email
				});
				setLoading(false);
			});
	}, []);

	const handleDelete = (id) => {
		blurRoot();

		setModal({
			id: id,
			text: "Da li ste sigurni da želite obrisati ovaj oglas?",
			btn1Txt: "Da",
			btn2Txt: "Ne",
			btn1Fn() {
				blurRoot();
				setModal(null);

			fetch('http://localhost:8080/posts?id=' + id, {
				method: 'DELETE'
				}).then(res => res.json())
					.then(res => {
						if (res?.posts?.status === 1)
						{
							nav('/');

							const inner = document.querySelector('.forInner');

							inner.insertAdjacentHTML('beforeend', `
							<p class="py-4">Oglas uspješno obrisan!</p>`);

							setTimeout(() => {
								while (inner.firstChild) inner.removeChild(inner.firstChild);
							}, 2000);
						}

						// todo: error handling
					});
			},
			btn2Fn() {
				blurRoot();
				setModal(null);
			}
		})
	};

	const PostJSX = (detailed) => {

		return <>
			<section className="bg-gray-light h-96 z-10" id="top">
				<div className="pt-10 pb-16 md:py-28 text-center max-w-screen-sm m-auto px-6 lg:px-0">
					<h2 className="text-mint hover:underline">
						<a className="" href={"/users/detailed?id=" + detailed.companyID}>
							{detailed.company}
						</a>
						<FontAwesomeIcon className="ml-1 pb-2" icon={faLink}/>
					</h2>
					<h1 className="text-xl md:text-4xl md:leading-snug pb-4 font-semibold text-coolGray-dark">
						{detailed.title}
					</h1>
					<div className="m-auto">
						<div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-coolGray-dark">
							<span>Rad na lokaciji</span>
							<span className="hidden sm:block">|</span>

							<div className="flex flex-row gap-2 items-center">
								<span>{detailed.city}</span>
								<FontAwesomeIcon
									icon={faLocationArrow}
									className="text-coolGray-normal"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="mt-10 text-left max-w-screen-sm m-auto px-6 lg:px-0">
					<h3 className="text-2xl font-semibold text-center sm:text-left">O nama</h3>
					<p className="mt-2 text-coolGray-dark text-center sm:text-left">{detailed.companyAbout}</p>
				</div>
			</section>

			<section>
				<div className="mt-10 text-left max-w-screen-sm m-auto px-6 lg:px-0">
					<h3 className="text-2xl font-semibold text-center sm:text-left">Opis posla</h3>
					<p className="mt-2 text-coolGray-dark text-center sm:text-left">{detailed.about}</p>
				</div>
			</section>

			<section>
				<div className="mt-10 text-left max-w-screen-sm m-auto px-6 lg:px-0">
					<h3 className="text-2xl font-semibold text-center sm:text-left">Kvalifikacije</h3>
					<p className="mt-2 text-coolGray-dark text-center sm:text-left">{detailed.qual}</p>
				</div>
			</section>

			<section>
				<div className="mt-10 text-center max-w-screen-sm m-auto px-6 lg:px-0">
					{Array.isArray(logged) && logged[1] === detailed.companyID ? (
						<>
							<Button
								text="Uredi oglas"
								className="text-wht bg-mint mr-5"
								onClick={() => nav('/update' + '?id=' + detailed.id)}
							/>
							<Button
								text="Obriši oglas"
								className="text-wht bg-redwood-normal border-redwood-normal hover:bg-redwood-light"
								onClick={() => handleDelete(detailed.id)}
							/>
						</>
					) : (
						<Button
							text="Kontaktiraj"
							className="text-wht bg-mint"
							onClick={() => openMail(detailed.email)}
						/>
					)}
				</div>
			</section>
		</>
	};

	if (loading)
	{
		return <div className={"text-mint font-bold text-2xl text-center pt-64 h-[70vh]"}>Loading ...</div>
	}

	return PostJSX(detailed);
};

export default DetaildPost;
