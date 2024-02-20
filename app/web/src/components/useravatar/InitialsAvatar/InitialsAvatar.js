export const getUserInitial = (name) =>
{

	if (!name || name?.length < 1)
	{
		return 'E'
	}
	else
	{
		return name.slice(0, 1).toUpperCase();
	}
}

export const getRandomColor = () =>
{
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

const InitialsAvatar = ({name, className, randomColor}) => {
	return <span
		className={'block select-none text-center md:text-4xl text-2xl w-[44px] h-[44px] sm:w-[64px] sm:h-[64px] md:py-3 py-1 ' + className}
		style={{backgroundColor: randomColor ? getRandomColor() : 'white'}}>{getUserInitial(name)}</span>;
};

export default InitialsAvatar;