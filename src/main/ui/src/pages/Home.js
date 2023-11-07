import Header from "../sections/header/Header";
import SearchBar from "../components/search/posts/SearchBar";
import Posts from "../sections/grid/post/Posts";

const Home = () =>
{
	return (
		<>
			<Header/>
			<SearchBar/>
			<Posts/>
		</>
	);
};

export default Home;