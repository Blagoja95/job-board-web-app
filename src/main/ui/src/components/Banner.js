import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationCircle, faExclamationTriangle, faInfoCircle} from "@fortawesome/fontawesome-free-solid";

const Banner = ({type, message, show}) => {
	let iconName, iconClass = 'text-white', bannerClass = 'text-white';

	if (type === 'error')
	{
		iconName = faExclamationCircle;
		bannerClass += ' bg-red-500'
	}
	else if (type === 'warning')
	{
		iconName = faExclamationTriangle;
		bannerClass += ' bg-yellow-400'
	}
	else if (type === 'info')
	{
		iconName = faInfoCircle;
		bannerClass += ' bg-blue-500'
	}
	else
	{
		iconName = faInfoCircle;
		iconClass = 'text-blue-500';
	}

	return (
		<div className={`w-4/5 mx-auto my-2 items-center justify-center flex-wrap gap-3 p-4 rounded shadow ${bannerClass} transition-all duration-300 ${show ? 'opacity-100 h-auto flex' : 'opacity-0 h-0 hidden'}`}>
			<FontAwesomeIcon icon={iconName} className={iconClass}/>
			<p className='flex-1 overflow-hidden whitespace-nowrap overflow-ellipsis'>{message}</p>
		</div>
	);
};

export default Banner;