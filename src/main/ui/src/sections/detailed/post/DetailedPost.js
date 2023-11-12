import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faLocationArrow,
	faLink,
} from "@fortawesome/fontawesome-free-solid";
import Button from "../../../components/button/Button";
import {openMail, blurRoot, unBloorRoot, displayBanner, handleDelete} from "../../../utils/util/utils";
import React, {useContext, useEffect, useState} from "react";
import {DetailContext, ModalContext, LoginContext, BannerContext} from "../../../App";
import {useNavigate} from "react-router-dom";
import PingAnimation from "../../../components/ping/PingAnimation";

const DetaildPost = () =>
{
	const [loading, setLoading] = useState(true);
	const {setModal} = useContext(ModalContext);
	const {detailed, setDetailed} = useContext(DetailContext);
	const nav = useNavigate();
	const {logged} = useContext(LoginContext);
	const setBanner = useContext(BannerContext);

	useEffect(() => async () =>
	{
		const id = new URLSearchParams(window.location.search).get('id');

		await fetch('http://localhost:8080/posts?id=' + id)
			.then(response => response.json())
			.then(async data =>
			{
				if (!data || data?.results === 0)
				{
					return;
				}

				const post = data.posts[0];
				const user = await fetch('http://localhost:8080/users?id=' + post.companyID)
					.then(response => response.json())
					.then(data => data.users[0])
					.catch((res) =>
					{
						displayBanner({
							msg: res.message,
							type: 'error'
						}, setBanner);
					});

				setDetailed({
					...post,
					company: user.name,
					companyAbout: user.about,
					email: user.email
				});
				setLoading(false);
			})
			.catch((res) =>
			{
				displayBanner({
					msg: res.message,
					type: 'error'
				}, setBanner);
			});
	}, []);

	const PostJSX = (detailed) =>
	{

		return <>
			<section className="bg-gray-light md:h-96 z-10" id="top">
				<div className="pt-10 pb-16 md:py-28 text-center max-w-screen-sm m-auto px-6 lg:px-0">
					<h2 className="text-mint hover:underline">
						<a className="" href={"/users/detailed?id=" + detailed.companyID}>
							{detailed.company}
						</a>
						<FontAwesomeIcon className="ml-1 md:pb-2" icon={faLink}/>
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
								onClick={() =>
								{
									nav('/update' + '?id=' + detailed.id);
								}}
							/>
							<Button
								text="Obriši oglas"
								className="text-wht bg-redwood-normal border-redwood-normal hover:bg-redwood-light"
								onClick={() => handleDelete(detailed.id, setModal, setBanner, nav, 'posts', 'Da li želite da obrišete ovaj oglas?')}
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
		return <PingAnimation/>
	}

	return PostJSX(detailed);
};

export default DetaildPost;
