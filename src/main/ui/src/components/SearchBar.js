import { Combobox } from "react-widgets";
import Button from "./Button";
import {useContext} from "react";
import {PostsContext, UsersContext} from "../App";

const getPosts = (value = '') => fetch('http://localhost:8080/posts' + value)
	.then(response => response.json())
	.then(data => data.posts);

const handleChange = async (value, param, setPosts) => {
	let posts = [];

	if(!value || value === 'Sve')
		posts = await getPosts();
	else
		posts = await getPosts(`?${param}=${value}`);
		setPosts(posts);
};

const onSearch = (setPosts) => {
	const val = document.querySelector('.searchInput')?.value

	if(!val && val?.length <= 1){
		document.querySelector('.searchInput').value = '';
		document.querySelector('.searchInput').placeholder = 'Polje ne moze biti prazno';
	}
	else{
		handleChange(val, 'title', setPosts);
		document.querySelector('.searchInput').placeholder = '';
	}
}

const SearchBar = () => {
	const {setPosts, types, cities} = useContext(PostsContext);

	return (
		<div className="flex flex-row justify-between gap-8 search-shadow border max-w-screen-lg m-auto -mt-9 py-7 md:py-10 px-6 border job-shadow rounded-3xl bg-white border-gray-light ">
			<Combobox placeholder={"Pretraga po lokaciji"} data={['Sve', ...cities]} onChange={value => handleChange(value, 'city', setPosts)}/>

			<Combobox placeholder={"Pretraga po angažman"} data={['Sve', ...types]} onChange={value => handleChange(value, 'type', setPosts)}/>

			<input
				type="text"
				placeholder="Pretraga po naslovu ..."
				className="searchInput border-2 focus:border-mint outline-none pl-2 rounded-xl h-[40px] w-64"
				onKeyDown={(e) => {
					if(e.key === 'Enter')
						onSearch(setPosts)
				}
				}
			></input>

			<Button text={"Pretraži"} className="bg-mint text-wht" onClick={() => onSearch(setPosts)}/>
		</div>
	);
};

export default SearchBar;
