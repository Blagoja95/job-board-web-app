import ShortPost from "../components/ShortPost"

const makeShortPosts = (posts) => {
	return posts.map(post => <ShortPost post={post} key={post.id}/>)
}

// const getPosts = (setPosts) => fetch('http://localhost:8080/posts')
// 	.then(res => res.json())
// 	.then(ob => {
// 		console.log(ob);
// 		setPosts(ob.posts)
// 	});

const Posts = ({posts, setPosts}) => {
	// getPosts(setPosts);

	return (
		<div className="py-20">
			{makeShortPosts(posts)}
		</div>
	)
}
export default Posts