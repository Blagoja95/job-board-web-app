import DetaildPost from "../components/DetailedPost";
import ShortPost from "../components/ShortPost";
import ReactDOM from "react-dom";

const makeShortPosts = (posts) => {
  return posts.map((post) => (
    <ShortPost post={post} key={post.id} openDetailedPost={openDetailedPost} />
  ));
};

// const getPosts = (setPosts) => fetch('http://localhost:8080/posts')
// 	.then(res => res.json())
// 	.then(ob => {
// 		console.log(ob);
// 		setPosts(ob.posts)
// 	});

const post = {
  // TODO: remove later
  id: 1000,
  companyID: 209,
  company: "InterPO",
  companyAbout: "InterPO je moderna IT kompanija koja se bavi razvojem softvera za različite industrije i korisnike širom sveta. Naša strast i posvećenost u stvaranju visokokvalitetnih rešenja u kombinaciji sa našim razumevanjem potreba klijenata nam omogućuje da kreiramo jedinstvena i funkcionalna softverska rešenja.",
  email: "posao@interpo.com",
  title: "Potreban WEB programer",
  type: "remote",
  city: "Banja Luka",
  about: "InterPO je u potrazi za stručnim i motivisanim web programerom koji će se pridružiti našem timu. Kao web programer u InterPO-u, vaša uloga biće da radite na razvoju i održavanju visokokvalitetnih web aplikacija za naše klijente. Vaše zaduženje će obuhvatiti pisanje čistog i efikasnog koda, razumevanje potreba klijenata i kreiranje funkcionalnih i skalabilnih web rešenja.",
  qual: "Tražimo osobu koja poseduje iskustvo u programiranju na front-end i/ili back-endu i koja poznaje različite tehnologije kao što su HTML, CSS, JavaScript, PHP i MySQL. Takođe, važno nam je da imate iskustvo u radu sa različitim razvojnim alatima i okvirima kao što su React, Angular, Vue.js, Laravel, Symfony i slično.",
  date: new Date(),
};

const openDetailedPost = (id) => {
  const innerContent = document.querySelector(".forInner");

  fetch("http://localhost:8080/post?id=" + id)
    .then((res) => res.json())
    .then((detaildPost) => {
      while (innerContent.firstChild) {
        innerContent.removeChild(innerContent.firstChild);
      }

      ReactDOM.render(<DetaildPost post={detaildPost} />, innerContent);
    });
};

const Posts = ({ posts, setPosts }) => {
	 
  return <div className="py-20 postContainer">{makeShortPosts(posts)}</div>;
};
export default Posts;
