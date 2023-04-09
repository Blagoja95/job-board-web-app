import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faClipboard,
  faClock,
} from "@fortawesome/fontawesome-free-solid";

const ShortPost = ({ post, openDetailedPost }) => {
  return (
    <a
      href={"/post?id=" + post.id}
      onClick={(e) => {
        e.preventDefault();
        openDetailedPost(post.id);
      }}
    >
      <div className="flex flex-row justify-around text-center border rounded-xl sm w-4/5 m-auto py-10 mb-4 hover:border-mint hover:border-2">
        <div className="text-left">
          <h3 className="text-mint">{post.title}</h3>
          <p>{post.companyName}</p>
        </div>

        <div>
          <div className="flex flex-row items-center gap-2">
            <FontAwesomeIcon
              icon={faLocationArrow}
              className="text-coolGray-normal"
            />
            <h3 className="text-coolGray-normal">Lokacija</h3>
          </div>

          <p>{post.city}</p>
        </div>

        <div>
          <div className="flex flex-row items-center gap-2">
            <FontAwesomeIcon
              icon={faClipboard}
              className="text-coolGray-normal"
            />
            <h3 className="text-coolGray-normal">Angažman</h3>
          </div>

          <p>{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</p>
        </div>

        <div>
          <div className="flex flex-row items-center gap-2">
            <FontAwesomeIcon icon={faClock} className="text-coolGray-normal" />
            <h3 className="text-coolGray-normal">Datum objave</h3>
          </div>

          <p>{`${post.date}`}</p>
        </div>
      </div>
    </a>
  );
};

export default ShortPost;
