import './index.css'
import Navigation from './sections/Navigation';
import Header from './sections/Header'
import SearchBar from "./components/SearchBar";
import Footer from './sections/Footer';
import Posts from './sections/Posts';

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
	},
	{
		id: 1000,
		companyID: 209,
		title: 'Potreban radnik u skladištu',
		type: 'pun aražman',
		city: 'Doboj',
		about: 'Potreban radnik za rad u skladistu',
		qual: 'Poznavanje ...',
		date: new Date()
	},
]

function App() {
	return (
		<div>
			<Navigation />
			<Header />
			<SearchBar />
			<Posts posts={posts} />
			<Footer />
		</div>
	);
}

export default App;
