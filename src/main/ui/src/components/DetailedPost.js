import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faClipboard,
  faClock,
  faLink
} from "@fortawesome/fontawesome-free-solid";
import Button from "./Button";

const openMail = (mail)  => {

  window.location.href = 'mailto:' + mail;
};

const DetaildPost = ({ post }) => {
  return (
    <>
    <section className="bg-gray-light h-96 z-10" id="top">
      <div className="pt-10 pb-16 md:py-28 text-center max-w-screen-sm m-auto px-6 lg:px-0">
      <h2 className="text-mint hover:underline">
            <a className="" href={"/user?id=" + post.companyID}>
              {post.company}
            </a>
            <FontAwesomeIcon className="ml-1 pb-2" icon={faLink}/>
          </h2>
        <h1 className="md:text-4xl md:leading-snug pb-4 font-semibold text-coolGray-dark">
          {post.title}
        </h1>
        <div className="m-auto">
          <div className="flex flex-row justify-center items-center gap-2 text-coolGray-dark">
            <span>Rad na lokaciji</span>
            <span>|</span>
            <span>{post.city}</span>
            <FontAwesomeIcon icon={faLocationArrow} className="text-coolGray-normal"/>
          </div>
        </div>

        <div className="mt-20">
        <div className="flex flex-row justify-around text-center">
    
        <div>
          <div className="flex flex-row items-center gap-2">
            <h3 className="text-coolGray-normal">Angažman</h3>
            <FontAwesomeIcon icon={faClipboard} className="text-coolGray-dark"/>
          </div>

          <p className="text-airForceBlue text-sm">{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</p>
        </div>

        <div>
          <div className="flex flex-row items-center gap-2">
            <h3 className="text-coolGray-normal">Datum objave</h3>
            <FontAwesomeIcon icon={faClock} className="text-coolGray-dark"/>
          </div>

          <p className="text-airForceBlue text-sm">{`${post.date.toLocaleTimeString(
            "en-US"
          )} ${post.date.getMonth()} ${post.date.getYear()}`}</p>
        </div>
      </div>
        </div>
      </div>
    </section>

<section>
  <div className=" mt-10 text-left max-w-screen-sm m-auto px-6 lg:px-0">
  <h3 className="text-2xl font-semibold">O nama</h3>

  <p className="mt-2 text-coolGray-dark">{post.companyAbout}</p>
    </div>
</section>

<section>
  <div className=" mt-10 text-left max-w-screen-sm m-auto px-6 lg:px-0">
  <h3 className="text-2xl font-semibold">Opis posla</h3>

  <p className="mt-2 text-coolGray-dark">{post.about}</p>
    </div>
</section>

<section>
  <div className=" mt-10 text-left max-w-screen-sm m-auto px-6 lg:px-0">
  <h3 className="text-2xl font-semibold">Kvalifikacije</h3>

  <p className="mt-2 text-coolGray-dark">{post.qual}</p>
    </div>
</section>


<section>
<div className=" mt-10 text-center max-w-screen-sm m-auto px-6 lg:px-0">
  <Button text="Kontaktiraj" className="text-wht bg-mint" onClick={ () => openMail(post.email)}/>
</div>
</section>
    </>
  );
};

export default DetaildPost;
