import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow} from "@fortawesome/fontawesome-free-solid";
import colors from "tailwindcss/colors";

export const getFirstLine = (input) => {

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

export const getUserInitial = (name) => {

	if (!name || name?.length < 1)
	{
		return 'E'
	}
	else
	{
		return name.slice(0, 1).toUpperCase();
	}
}

const getImage = (user) => {

	if (user?.img)
	{
		return <img className="w-[44px] sm:w-[64px]" src={user.img}></img>
	}
	else
	{
		return <span
			className={"text-white text-center md:text-4xl text-2xl w-[44px] h-[44px] sm:w-[64px] sm:h-[64px] md:py-3 py-1 "}
			style={{backgroundColor: getRandomColor()}}>{getUserInitial(user.name)}</span>;
	}
}

export const getRandomColor = () => {
	const colorList = [
		'beige',
		'blueviolet',
		'aquamarine',
		'greenyellow',
		'lavender',
		'lightblue',
		'lightseagreen',
		'palegreen',
		'skyblue',
		'yellowgreen',
		'indianred'
	];

	return colorList[Math.floor(Math.random() * colorList.length)];
}

const UserShort = ({user, openDetailedUser}) => {
	const line = getFirstLine(user.about);

	return <a
		onClick={(e) => {
			e.preventDefault();
			openDetailedUser();
		}}
		className="grid lg:grid-cols-5 grid-cols-3 justify-items-center items-center border rounded-xl lg:w-4/5 w-[90%] m-auto py-5 md:py-10 mb-4 hover:border-mint hover:border-1 hover:cursor-pointer">
		{getImage(user)}

		<h3 className="text-xs sm:text-base text-mint text-center sm:text-left">{user.name}</h3>

		<div className="flex-col items-center">
			<div className="flex flex-row items-center gap-2">
				<FontAwesomeIcon
					icon={faLocationArrow}
					className="text-coolGray-normal text-xs"
				/>
				<p className="text-xs">{user.city}</p>
			</div>
		</div>

		<p className="text-sm hidden col-span-2 lg:block lg:text-xs text-center">{line}</p>
	</a>

};

export default UserShort;