import ShortPost from "../components/ShortPost";
import {useContext, useEffect} from "react";
import {PostsContext} from "../App";
import {useNavigate} from "react-router-dom";

const removeDuplicates = (items) => {
	return items.filter((item,index) => items.indexOf(item) === index);
};

const getPosts = (setPosts, setCities, setTypes) => fetch('http://localhost:8080/posts')
	.then(response => response.json())
	.then(data => {
		const types = [], cities = [];

		data.posts.forEach(post => {
			types.push(post.type);
			cities.push(post.city);
		});

		setPosts(data.posts);
		setCities(removeDuplicates(cities));
		setTypes(removeDuplicates(types));
	});

const makeShortPosts = (posts, nav) => {
	return posts.map((post) => (
		<ShortPost post={post} key={post.id} openDetailedPost={() => nav('/detailed' + '?id=' + post.id)} />
	));
};

const Posts = () => {
	const {posts, setPosts, setCities, setTypes} = useContext(PostsContext);
	const nav = useNavigate();

	useEffect(() => {
		getPosts(setPosts, setCities, setTypes);
	}, []);

	return <div className="py-20">
		{makeShortPosts(posts, nav)}
	</div>;
};

export default Posts;
