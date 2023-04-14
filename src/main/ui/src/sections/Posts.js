import DetaildPost from "../components/DetailedPost";
import ShortPost from "../components/ShortPost";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

const getPosts = (setPosts) => fetch('http://localhost:8080/posts')
	.then(response => response.json())
	.then(data => setPosts(data.posts));

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
	const [posts, setPosts] = useState([]);

	useEffect(() => {
			getPosts(setPosts);
		}, []);
		

	return <div className="py-20">
		{makeShortPosts(posts)}
	</div>;
};

export default Posts;
