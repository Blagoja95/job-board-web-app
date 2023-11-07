import ShortPost from "../../../components/card/post/ShortPost";
import React, {useContext, useEffect, useState} from "react";
import {PostsContext} from "../../../App";
import {useNavigate} from "react-router-dom";
import {removeDuplicates} from "../../../utils/util/utils";
import PingAnimation from "../../../components/ping/PingAnimation";

const Posts = ({userId = null}) =>
{
	const [loading, setLoading] = useState(true);
	const {posts, setPosts, setCities, setTypes} = useContext(PostsContext);
	const nav = useNavigate();

	useEffect(() =>
	{
		getPosts(setPosts, setCities, setTypes);
	}, []);


	const getPosts = (setPosts, setCities, setTypes) => fetch(`http://localhost:8080/posts${userId !== null ? `?companyID=${userId}` : ''}`)
		.then(response => response.json())
		.then(data =>
		{
			const types = [], cities = [];

			data.posts.forEach(post =>
			{
				types.push(post.type);
				cities.push(post.city);
			});

			setPosts(data.posts);

			setCities(removeDuplicates(cities));
			setTypes(removeDuplicates(types));
			setLoading(false);
		});

	const makeShortPosts = (posts, nav) =>
	{
		return posts.map((post, i) => (
			<ShortPost post={post} key={post.id + '-' + post.title.replace(' ', '_') + '_' + i}
					   openDetailedPost={() => nav('/posts/detailed' + '?id=' + post.id)}/>
		));
	};

	if (loading)
	{
		return <PingAnimation/>
	}

	if (!Array.isArray(posts) || posts.length < 1)
		return <p className={"text-mint font-bold text-2xl text-center py-20"}>Currently there is no job postings
			available!</p>

	return <div className="py-20">
		{makeShortPosts(posts, nav)}
	</div>;
};

export default Posts;
