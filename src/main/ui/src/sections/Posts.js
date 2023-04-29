import DetaildPost from "../components/DetailedPost";
import ShortPost from "../components/ShortPost";
import ReactDOM from "react-dom";
import {useContext, useEffect} from "react";
import {PostsContext} from "../App";

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

const makeShortPosts = (posts) => {
	return posts.map((post) => (
		<ShortPost post={post} key={post.id} openDetailedPost={openDetailedPost} />
	));
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

const Posts = () => {
	const {posts, setPosts, setCities, setTypes} = useContext(PostsContext);

	useEffect(() => {
		getPosts(setPosts, setCities, setTypes);
	}, []);

	return <div className="py-20">
		{makeShortPosts(posts)}
	</div>;
};

export default Posts;
