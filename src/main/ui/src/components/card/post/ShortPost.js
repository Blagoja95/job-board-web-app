import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faLocationArrow,
	faClipboard,
	faClock,
} from '@fortawesome/fontawesome-free-solid';

const ShortPost = ({post, openDetailedPost}) =>
{

	return (
		<a
			onClick={(e) =>
			{
				e.preventDefault();
				openDetailedPost();
			}}
		>
			<div
				className='grid xl:grid-cols-5 md:grid-cols-4 grid-cols-3 justify-items-center border rounded-xl w-4/5 m-auto py-5 md:py-10 mb-4 hover:border-mint hover:border-1 hover:cursor-pointer max-w-[1000px]'>
				<img className='w-[44px] sm:w-[64px]' src={'https://picsum.photos/64?random=' + post.id}></img>

				<div className='text-left flex flex-col col-span-2 sm:col-span-1 items-left gap-2 md:w-[200px]'>
					<h3 className='text-sm sm:text-base text-mint text-center sm:text-left'>{post.title}</h3>
					<p className='text-sm sm:text-base text-center sm:text-left'>{post.companyName}</p>
				</div>

				<div className='hidden sm:flex flex-col items-center'>
					<div className='flex flex-row items-center gap-2'>
						<FontAwesomeIcon
							icon={faLocationArrow}
							className='text-coolGray-normal'
						/>
						<h3 className='text-coolGray-normal'>Lokacija</h3>
					</div>

					<p>{post.city}</p>
				</div>

				<div className='hidden xl:flex flex-col items-center'>
					<div className='flex flex-row items-center gap-2'>
						<FontAwesomeIcon
							icon={faClipboard}
							className='text-coolGray-normal'
						/>
						<h3 className='text-coolGray-normal'>Angažman</h3>
					</div>

					<p>{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</p>
				</div>

				<div className='hidden md:flex flex-col items-center'>
					<div className='flex flex-row items-center gap-2'>
						<FontAwesomeIcon icon={faClock} className='text-coolGray-normal'/>
						<h3 className='text-coolGray-normal'>Datum objave</h3>
					</div>

					<p>{`${post.date}`}</p>
				</div>
			</div>
		</a>
	);
};

export default ShortPost;
