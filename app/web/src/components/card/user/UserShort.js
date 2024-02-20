import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLocationArrow} from '@fortawesome/fontawesome-free-solid';
import {getAvatar} from '../../useravatar/getAvatar/getAvatar';

export const getFirstLine = (input) =>
{

	if (!input)
	{
		return '';
	}

	let text = '';

	const sentences = input.match(/[^.!?]+[.!?]+/g);

	if (sentences && sentences.length > 0)
	{
		text = sentences[0].trim();
	}
	else
	{
		text = input.trim();
	}

	return text.length > 69 ? text.slice(0, 69) + ' ...' : text;
};

const UserShort = ({user, openDetailedUser}) =>
{
	const line = getFirstLine(user.about);

	return <div
		onClick={(e) =>
		{
			e.preventDefault();
			openDetailedUser();
		}}
		className='grid lg:grid-cols-5 grid-cols-3 justify-items-center items-center border rounded-xl lg:w-4/5 w-[90%] m-auto py-5 md:py-10 mb-4 hover:border-mint hover:border-1 hover:cursor-pointer'>
		{getAvatar(user, 'text-white', true)}

		<h3 className='text-xs sm:text-base text-mint text-center sm:text-left'>{user.name}</h3>

		<div className='flex-col items-center'>
			<div className='flex flex-row items-center gap-2'>
				<FontAwesomeIcon
					icon={faLocationArrow}
					className='text-coolGray-normal text-xs'
				/>
				<p className='text-xs'>{user.city}</p>
			</div>
		</div>

		<p className='text-sm hidden col-span-2 lg:block lg:text-xs text-center'>{line}</p>
	</div>

};

export default UserShort;