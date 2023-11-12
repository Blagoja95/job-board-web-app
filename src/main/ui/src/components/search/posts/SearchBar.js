import {Combobox} from 'react-widgets';
import Button from '../../button/Button';
import {useContext} from 'react';
import {BannerContext, PostsContext} from '../../../App';
import {displayBanner} from "../../../utils/util/utils";

const SearchBar = ({
					   uri = 'posts',
					   cmbLocationOn = true,
					   cmbTypeOn = true,
					   searchFieldOn = true
				   }) =>
{

	let {setPosts, types, cities} = useContext(PostsContext);
	const setBanner = useContext(BannerContext);

	const getData = (value = '') => fetch(`http://localhost:8080/${uri}${value}`)
		.then(response => response.json())
		.then(data => data.posts)
		.catch((res) =>
		{
			displayBanner({
				msg: res.message,
				type: 'error'
			}, setBanner);
		});

	const clearInputFld = () =>
	{
		const input = document.querySelector('.searchInput');

		input.value = '';
		input.placeholder = 'Pretraga po naslovu ...';
	};

	const invalidInputFld = () =>
	{
		const input = document.querySelector('.searchInput');

		input.value = '';
		input.placeholder = 'Polje ne moze biti prazno';
	}

	const handleChange = async (value, param, set) =>
	{
		let posts = [];

		if (!value || value === 'Sve')
		{
			posts = await getData();
		}
		else
		{
			posts = await getData(`?${param}=${value}`);
		}
		set(posts);
	};

	const onSearch = async (set) =>
	{
		const val = document.querySelector('.searchInput')?.value

		if (!val && val?.length <= 1)
		{
			invalidInputFld();
			set(await getData());
		}
		else
		{
			handleChange(val, 'title', set);
		}
	}

	return (
		<div
			className='flex flex-col md:flex-row justify-center items-center gap-8 search-shadow border w-fit m-auto -mt-9 py-7 md:py-10 px-6 job-shadow rounded-3xl bg-white border-gray-light'>
			{<Combobox className='sCmb' placeholder={'Pretraga po lokaciji'} data={['Sve', ...cities]}
					   onChange={value =>
					   {
						   clearInputFld();
						   handleChange(value, 'city', setPosts);
					   }}
					   style={{display: `${cmbLocationOn ? 'block' : 'none'}`}}
			/>
			}

			<Combobox className='sCmb' placeholder={'Pretraga po angažman'} data={['Sve', ...types]}
					  onChange={value =>
					  {
						  clearInputFld();
						  handleChange(value, 'type', setPosts);
					  }}
					  style={{display: `${cmbTypeOn ? 'block' : 'none'}`}}
			/>

			{
				searchFieldOn ?
					<><input
						type='text'
						placeholder='Pretraga po naslovu ...'
						className='searchInput border-2 focus:border-mint outline-none pl-2 rounded-xl h-[40px] md:w-64'
						onKeyDown={(e) =>
						{
							if (e.key === 'Enter')
							{
								onSearch(setPosts)
							}
						}}
					/>

						<Button text={'Pretraži'} className='bg-mint text-wht' onClick={() =>
						{
							document.getElementById('sCmb')
							onSearch(setPosts);
						}}
						/></>
					:
					<></>
			}

		</div>
	);
};

export default SearchBar;
