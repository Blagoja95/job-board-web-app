import "./index.css";
import Navigation from "./sections/Navigation";
import Header from "./sections/Header";
import SearchBar from "./components/SearchBar";
import Footer from "./sections/Footer";
import Posts from "./sections/Posts";
import DetaildPost from "./components/DetailedPost";
import Users from "./sections/Users";
import Window from "./sections/Window";
import { useState, useEffect } from "react";

const getPosts = (setPosts) => fetch('http://localhost:8080/posts')
	.then(response => response.json())
	.then(data => setPosts(data.posts));

const posts1 = [
	{
		id: 1021,
		companyID: 209,
		company: "InterPO",
		companyAbout:
			"InterPO je moderna IT kompanija koja se bavi razvojem softvera za različite industrije i korisnike širom sveta. Naša strast i posvećenost u stvaranju visokokvalitetnih rešenja u kombinaciji sa našim razumevanjem potreba klijenata nam omogućuje da kreiramo jedinstvena i funkcionalna softverska rešenja.",
		email: "posao@interpo.com",
		title: "Potreban WEB programer",
		type: "remote",
		city: "Banja Luka",
		about:
			"InterPO je u potrazi za stručnim i motivisanim web programerom koji će se pridružiti našem timu. Kao web programer u InterPO-u, vaša uloga biće da radite na razvoju i održavanju visokokvalitetnih web aplikacija za naše klijente. Vaše zaduženje će obuhvatiti pisanje čistog i efikasnog koda, razumevanje potreba klijenata i kreiranje funkcionalnih i skalabilnih web rešenja.",
		qual: "Tražimo osobu koja poseduje iskustvo u programiranju na front-end i/ili back-endu i koja poznaje različite tehnologije kao što su HTML, CSS, JavaScript, PHP i MySQL. Takođe, važno nam je da imate iskustvo u radu sa različitim razvojnim alatima i okvirima kao što su React, Angular, Vue.js, Laravel, Symfony i slično.",
		date: new Date(),
	},
	{
		id: 1000,
		companyID: 209,
		title: "Potreban radnik u skladištu",
		type: "pun angažman",
		city: "Doboj",
		about: "Potreban radnik za rad u skladistu",
		qual: "Poznavanje ...",
		date: new Date(),
	},
	{
		id: 1200,
		companyID: 209,
		title: "Potreban vozač",
		type: "pun angažman",
		city: "Banja Luka",
		about: "Potreban vozač za vosdsd",
		qual: "Poznavanje ...",
		date: new Date(),
	},
];

const post = {
	id: 1000,
	companyID: 209,
	company: "Novoteks doo",
	companyAbout: "Radimo dan i noc neprekidno ko ludaci",
	email: "callMe@masm.com",
	title: "Potreban radnik u skladištu",
	type: "pun angažman",
	city: "Doboj",
	about: "Potreban radnik za rad u skladistu za pretovoar utovar ...",
	qual: "Poznavanje ...",
	date: new Date(),
};

const users = [
	{
		id: 2022,
		name: "Tritol",
		email: "some@mail.com",
		about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		city: "Doboj",
	},
	{
		id: 231,
		name: "Comp1",
		email: "some@mail.com",
		about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		city: "Banja Luka",
	},
	{
		id: 1873,
		name: "TriBi",
		email: "some@mail.com",
		about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
		city: "Prijedor",
	},
	{
		id: 156,
		name: "ITAll",
		email: "some@mail.com",
		about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
		city: "Zvornik",
	},
	{
		id: 123,
		name: "InterPRO",
		email: "some@mail.com",
		about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		city: "Banja Luka",
	},
	{
		id: 33,
		name: "Klik tel",
		email: "some@mail.com",
		about: "Lorem ipsum dolor sit amet,  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		city: "Banja Luka",
	}
];

function App() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPosts(setPosts);
	}, []);

	return (
		<div>
			<Navigation />
			<div id="forWindow"></div>

			<div className="forInner">
				<Header />
				<SearchBar />
				{/* <Users users={posts}/> */}
				<Posts posts={posts} setPosts={setPosts} />
			</div>
			<Footer />
		</div>
	);
}

export default App;
