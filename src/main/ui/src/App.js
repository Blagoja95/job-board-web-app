import './index.css'
import Navigation from './sections/Navigation';
import Header from './sections/Header'
import SearchBar from "./components/SearchBar";
import Footer from './sections/Footer';
import Posts from './sections/Posts';
import DetaildPost from './components/DetailedPost';
import Users from './sections/Users';
import Window from './sections/Window';

const posts = [
	{
		id: 1000,
		companyID: 209,
		title: 'Potreban radnik u skladištu',
		type: 'pun aražman',
		city: 'Doboj',
		about: 'Potreban radnik za rad u skladistu',
		qual: 'Poznavanje ...',
		date: new Date()
	}
];

const post = {
		id: 1000,
		companyID: 209,
		company: 'Novoteks doo',
		companyAbout: 'Radimo dan i noc neprekidno ko ludaci',
		email: 'callMe@masm.com',
		title: 'Potreban radnik u skladištu',
		type: 'pun aražman',
		city: 'Doboj',
		about: 'Potreban radnik za rad u skladistu za pretovoar utovar ...',
		qual: 'Poznavanje ...',
		date: new Date()
}

const users = [
	{
		id: 202,
		name: 'Tritol',
		email: 'some@mail.com',
		about: 'Aout sdasdasd asd asd asd asd asd asd asd asd asd a',
		city: 'Doboj'
	},
	{
		id: 202,
		name: 'Tritol',
		email: 'some@mail.com',
		about: 'Aout sdasdasd asd asd asd asd asd asd asd asd asd a',
		city: 'Doboj'
	}
]

function App() {
	return (
		<div>
			<Navigation />
			<div id="forWindow"></div>
			<Header />
			<SearchBar />
			<Posts posts={posts} />
			<Footer />
		</div>
	);
}

export default App;
