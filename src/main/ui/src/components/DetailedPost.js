import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationArrow,
	faClipboard,
	faClock,
	faLink,
} from "@fortawesome/fontawesome-free-solid";
import Button from "./Button";
import {openMail} from "../utils";
import {useEffect, useState} from "react";
import Modal from "./Modal";
import {createPortal} from "react-dom";

const handleDelete = (id) => {
	createPortal (<Modal/>, document.getElementById('root'))
}

const DetaildPost = () => {
	const [detailed, setDetailed] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => async () => {
		const id = new URLSearchParams(window.location.search).get('id');

		const post = await fetch('http://localhost:8080/posts?id=' + id)
			.then(response => response.json())
			.then(data => data.posts[0]);

		const user = await fetch('http://localhost:8080/users?id=' + post.companyID)
			.then(response => response.json())
			.then(data => data.users[0]);

		setDetailed({...post,
			company: user.name,
			companyAbout: user.about,
			email: user.email
		});
		setLoading(false);
	}, []);

	if (loading)
		return <div className={"text-mint font-bold text-2xl text-center pt-64 h-[70vh]"}>Loading ...</div>

	return PostJSX(detailed);
};

export default DetaildPost;

const PostJSX = (detailed) => {
	const userID = JSON.parse(localStorage.getItem('login'));

	return <>
		<section className="bg-gray-light h-96 z-10" id="top">
			<div className="pt-10 pb-16 md:py-28 text-center max-w-screen-sm m-auto px-6 lg:px-0">
				<h2 className="text-mint hover:underline">
					<a className="" href={"/user?id=" + detailed.companyID}>
						{detailed.company}
					</a>
					<FontAwesomeIcon className="ml-1 pb-2" icon={faLink} />
				</h2>
				<h1 className="md:text-4xl md:leading-snug pb-4 font-semibold text-coolGray-dark">
					{detailed.title}
				</h1>
				<div className="m-auto">
					<div className="flex flex-row justify-center items-center gap-2 text-coolGray-dark">
						<span>Rad na lokaciji</span>
						<span>|</span>
						<span>{detailed.city}</span>
						<FontAwesomeIcon
							icon={faLocationArrow}
							className="text-coolGray-normal"
						/>
					</div>
				</div>

				<div className="mt-20">
					<div className="flex flex-row justify-around text-center">
						<div>
							<div className="flex flex-row items-center gap-2">
								<h3 className="text-coolGray-normal">Angažman</h3>
								<FontAwesomeIcon
									icon={faClipboard}
									className="text-coolGray-dark"
								/>
							</div>

							<p className="text-airForceBlue text-sm">
								{detailed.type.charAt(0).toUpperCase() + detailed.type.slice(1)}
							</p>
						</div>

						<div>
							<div className="flex flex-row items-center gap-2">
								<h3 className="text-coolGray-normal">Datum objave</h3>
								<FontAwesomeIcon
									icon={faClock}
									className="text-coolGray-dark"
								/>
							</div>

							<p className="text-airForceBlue text-sm">{`${detailed.date}`}</p>

							{/*<p className="text-airForceBlue text-sm">{`${detailed.date.toLocaleTimeString(*/}
							{/*	"en-US"*/}
							{/*)} ${detailed.date.getMonth()} ${detailed.date.getYear()}`}</p>*/}
						</div>
					</div>
				</div>
			</div>
		</section>

		<section>
			<div className=" mt-10 text-left max-w-screen-sm m-auto px-6 lg:px-0">
				<h3 className="text-2xl font-semibold">O nama</h3>

				<p className="mt-2 text-coolGray-dark">{detailed.companyAbout}</p>
			</div>
		</section>

		<section>
			<div className=" mt-10 text-left max-w-screen-sm m-auto px-6 lg:px-0">
				<h3 className="text-2xl font-semibold">Opis posla</h3>

				<p className="mt-2 text-coolGray-dark">{detailed.about}</p>
			</div>
		</section>

		<section>
			<div className=" mt-10 text-left max-w-screen-sm m-auto px-6 lg:px-0">
				<h3 className="text-2xl font-semibold">Kvalifikacije</h3>

				<p className="mt-2 text-coolGray-dark">{detailed.qual}</p>
			</div>
		</section>

		<section>
			<div className=" mt-10 text-center max-w-screen-sm m-auto px-6 lg:px-0">
				{
					(Array.isArray(userID) && userID[1] === Number.parseInt(detailed.companyID)) ?
						 <Button
					text="Obriši oglas"
					className="text-wht bg-redwood-normal border-redwood-normal hover:bg-redwood-light"
					onClick={() => handleDelete(detailed.id)}
					/>
					:
					<Button
					text="Kontaktiraj"
					className="text-wht bg-mint"
					onClick={() => openMail(detailed.email)}
					/>
				}
			</div>
		</section>
	</>};
