import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow} from "@fortawesome/fontawesome-free-solid";

export const getFirstLine = (fullLine) => {

	if (!fullLine)
	{
		return '';
	}

	if (fullLine.length > 69)
	{
		return fullLine.slice(0, 69) + ' ...';
	}

	return fullLine.split('(?<!\\w\\.\\w.)(?<![A-Z][a-z]\\.)(?<=\\.|\\?)\\s')[0];
};

export const getUserInitial = (name) => {

	if (!name || name?.length < 1)
	{
		return "E"
	}
	else
	{
		return name.slice(0, 1);
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
			className={"text-white text-center md:text-4xl text-2xl w-[44px] h-[44px] sm:w-[64px] sm:h-[64px] md:py-3 py-1 " + getRandomColor()}>{getUserInitial(user.name)}</span>;
	}
}

export const getRandomColor = () => {
	const colorsList = [
		'violet',
		'red',
		'blue',
		'indigo',
		'pink',
		'indigo',
		'amber'
	];

	return `bg-${colorsList[Math.round(Math.random() * (colorsList.length - 2) + 1)]}-200`;
}

const UserShort = ({user, openDetailedUser}) => {
	const line = getFirstLine(user.about);


	return <a
		onClick={(e) => {
			e.preventDefault();
			openDetailedUser();
		}}
	>
		<div
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

			<p className="text-sm hidden col-span-2 lg:block text-start lg:text-xs">{line}</p>
		</div>
	</a>;

};

export default UserShort;