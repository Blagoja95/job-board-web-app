import ShortPost from "../components/ShortPost"

const makeShortPosts = (posts) => {
	return posts.map(post => <ShortPost post={post} key={post.id}/>)
}
const Posts = ({posts}) => {
	return (
		<div className="py-20">
			{makeShortPosts(posts)}
		</div>
	)
}
export default Posts