import {getCookie} from '../../utils/cookie/cookie';
import {useNavigate} from 'react-router-dom';
import {displayBanner} from '../../utils/util/utils';
import {BannerContext} from '../../App';
import {useContext} from 'react';

const handleNav = (nav, setBanner) =>
{
	const id = getCookie('userID');

	if (id && !isNaN(Number.parseInt(id)))
	{
		displayBanner({
			msg: 'Beta verzija. Samo mogućnost čitanja!',
			type: 'info'
		}, setBanner);

		nav('/users/detailed' + '?id=' + id);
	}
	else
	{
		displayBanner({
			msg: 'Došlo je do greške!',
			type: 'error'
		}, setBanner);

		setTimeout(() =>
		{
			nav('/posts');
		}, 500);
	}
};

const UserMenu = ({fn}) =>
{
	const nav = useNavigate();
	const setBanner = useContext(BannerContext);

	return (
		<div className='user-menu absolute top-20 -right-7 bg-white border p-2 shadow-md select-none'>
			<ul>
				<li className='p-2 cursor-pointer hover:bg-gray-100'
					onClick={() => handleNav(nav, setBanner)}>Moj Profil
				</li>
				<li className='p-2 cursor-pointer hover:bg-gray-100'>Podešavanja</li>
				<li className='p-2 cursor-pointer hover:bg-gray-100' onClick={fn ? fn : () =>
				{
				}}>Odjavi se
				</li>
			</ul>
		</div>
	);
};

export default UserMenu;