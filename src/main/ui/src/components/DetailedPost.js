import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faLocationArrow,
    faClipboard,
    faClock,
    faLink,
} from "@fortawesome/fontawesome-free-solid";
import Button from "./Button";
import {openMail} from "../utils";
import {useEffect, useState} from "react";

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

        setDetailed({
            ...post,
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
    return <>
        <section className="bg-gray-light h-96 z-10" id="top">
            <div className="pt-10 pb-16 md:py-28 text-center max-w-screen-sm m-auto px-6 lg:px-0">
                <h2 className="text-mint hover:underline">
                    <a className="" href={"/user?id=" + detailed.companyID}>
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

						<span>
							{detailed.city}
						</span>
                            <FontAwesomeIcon
                                icon={faLocationArrow}
                                className="text-coolGray-normal"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <div className="flex flex-col sm:flex-row sm:justify-around text-center">
                        <div>
                            <div className="flex flex-row items-center gap-2 justify-center">
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
                            <div className="flex flex-row items-center gap-2 justify-center">
                                <h3 className="text-coolGray-normal">Datum objave</h3>
                                <FontAwesomeIcon
                                    icon={faClock}
                                    className="text-coolGray-dark"
                                />
                            </div>

                            <p className="text-airForceBlue text-sm">{`${detailed.date}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className=" mt-10 text-left max-w-screen-sm m-auto px-6 lg:px-0">
                <h3 className="text-2xl font-semibold text-center sm:text-left">O nama</h3>

                <p className="mt-2 text-coolGray-dark text-center sm:text-left">{detailed.companyAbout}</p>
            </div>
        </section>

        <section>
            <div className=" mt-10 text-left max-w-screen-sm m-auto px-6 lg:px-0">
                <h3 className="text-2xl font-semibold text-center sm:text-left">Opis posla</h3>

                <p className="mt-2 text-coolGray-dark text-center sm:text-left">{detailed.about}</p>
            </div>
        </section>

        <section>
            <div className=" mt-10 text-left max-w-screen-sm m-auto px-6 lg:px-0">
                <h3 className="text-2xl font-semibold text-center sm:text-left">Kvalifikacije</h3>

                <p className="mt-2 text-coolGray-dark text-center sm:text-left">{detailed.qual}</p>
            </div>
        </section>

        <section>
            <div className=" mt-10 text-center max-w-screen-sm m-auto px-6 lg:px-0">
                <Button
                    text="Kontaktiraj"
                    className="text-wht bg-mint"
                    onClick={() => openMail(detailed.email)}
                />
            </div>
        </section>
    </>
};