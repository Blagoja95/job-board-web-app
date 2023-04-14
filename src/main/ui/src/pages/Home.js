import Header from "../sections/Header";
import SearchBar from "../components/SearchBar";
import Posts from "../sections/Posts";

const Home = () => {
	return (
		<>
			<Header />
			<SearchBar />
			<Posts />
		</>
	);
};

export default Home;