import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faLocationArrow,
	faLink,
} from "@fortawesome/fontawesome-free-solid";
import Button from "./Button";
import {openMail} from "../utils";
import React, {useContext, useEffect, useState} from "react";
import {DetailContext, PostsContext} from "../App";
import Posts from "../sections/Posts";

const DetailedUser = () => {
	const [loading, setLoading] = useState(true);
	const {posts} = useContext(PostsContext);
	const {detailed, setDetailed} = useContext(DetailContext);

	useEffect(() => async () => {
		const id = new URLSearchParams(window.location.search).get('id');

		await fetch('http://localhost:8080/users?id=' + id)
			.then(response => response.json())
			.then(async data => {
				if (!data || data?.results === 0)
				{
					return;
				}

				setDetailed(...data.users);
				setLoading(false);
			});
	}, []);

	const UserJSX = (detailed) => {

		return <>
			<section className="bg-gray-light h-96 z-10" id="top">
				<div className="pt-10 pb-16 md:py-28 text-center max-w-screen-sm m-auto px-6 lg:px-0">
					<h2 className="text-mint hover:underline">
						<a className="" href={"/user?id=" + detailed.id}>
							{detailed.company}
						</a>
						<FontAwesomeIcon className="ml-1 pb-2" icon={faLink}/>
					</h2>
					<h1 className="text-xl md:text-4xl md:leading-snug pb-4 font-semibold text-coolGray-dark">
						{detailed.name}
					</h1>
					<div className="m-auto">
						<div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-coolGray-dark">
							<span>Broj oglasa <span
								className={"text-mint"}>{posts || posts.length > 0 ? posts.length : 0}</span></span>
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
					<h3 className="text-2xl font-semibold text-center text-min">O nama</h3>
					<p className="mt-2 text-coolGray-dark text-center">{detailed.about}</p>
				</div>
			</section>

			<section>
				<div className="mt-10 text-center max-w-screen-sm m-auto px-6 lg:px-0">
					<Button
						text="Kontaktiraj"
						className="text-wht bg-mint"
						onClick={() => openMail(detailed.email)}
					/>
				</div>
			</section>

			<Posts userId={detailed.id}/>
		</>
	};

	if (loading)
	{
		return <div className={"text-mint font-bold text-2xl text-center pt-64 h-[70vh]"}>Loading ...</div>
	}

	return UserJSX(detailed);
};

export default DetailedUser;
