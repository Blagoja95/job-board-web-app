import {Combobox} from "react-widgets";
import Button from "./Button";
import {useContext} from "react";
import {PostsContext, UsersContext} from "../App";
import posts from "../sections/Posts";

const SearchBar = ({uri = 'posts', cmbLocationOn = true, cmbTypeOn = true, searchFieldOn = true, searchBtnOn = true}) => {
	const {setPosts, types, cities} = useContext(PostsContext);

	const getPosts = (value = '') => fetch(`http://localhost:8080/${uri}${value}`)
		.then(response => response.json())
		.then(data => data.posts);

	const clearInputFld = () => {
		const input = document.querySelector('.searchInput');

		input.value = '';
		input.placeholder = 'Pretraga po naslovu ...';
	};

	const invalidInputFld = () => {
		const input = document.querySelector('.searchInput');

		input.value = '';
		input.placeholder = 'Polje ne moze biti prazno';
	}

	const handleChange = async (value, param, setPosts) => {
		let posts = [];

		if (!value || value === 'Sve')
		{
			posts = await getPosts();
		}
		else
		{
			posts = await getPosts(`?${param}=${value}`);
		}
		setPosts(posts);
	};

	const onSearch = async (setPosts) => {
		const val = document.querySelector('.searchInput')?.value

		if (!val && val?.length <= 1)
		{
			invalidInputFld();
			setPosts(await getPosts());
		}
		else
		{
			handleChange(val, 'title', setPosts);
		}
	}

	return (
		<div
			className="flex flex-col md:flex-row justify-between gap-8 search-shadow border max-w-screen-lg m-auto -mt-9 py-7 md:py-10 px-6 job-shadow rounded-3xl bg-white border-gray-light">
			{<Combobox className="sCmb" placeholder={"Pretraga po lokaciji"} data={['Sve', ...cities]}
					  onChange={value => {
						  clearInputFld();
						  handleChange(value, 'city', setPosts);
					  }}/>
			}

			<Combobox className="sCmb" placeholder={"Pretraga po angažman"} data={['Sve', ...types]}
					  onChange={value => {
						  clearInputFld();
						  handleChange(value, 'type', setPosts);
					  }}/>

			<input
				type="text"
				placeholder="Pretraga po naslovu ..."
				className="searchInput border-2 focus:border-mint outline-none pl-2 rounded-xl h-[40px] md:w-64"
				onKeyDown={(e) => {
					if (e.key === 'Enter')
					{
						onSearch(setPosts)
					}
				}}
			></input>

			<Button text={"Pretraži"} className="bg-mint text-wht" onClick={() => {
				document.getElementById("sCmb")
				onSearch(setPosts);
			}}/>
			}
		</div>
	);
};

export default SearchBar;
