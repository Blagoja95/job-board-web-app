import {getCookie} from '../../utils/cookie/cookie';
import {useNavigate} from 'react-router-dom';
import {displayBanner} from '../../utils/util/utils';
import {BannerContext} from '../../App';
import {useContext} from 'react';

const handleNav = (nav, setBanner, type) =>
{
	const id = getCookie('userID');

	if (id && !isNaN(Number.parseInt(id)))
	{
		const msg = {
			settings: '',
			profile: 'Beta verzija. Samo mogućnost čitanja!',
			error: 'Wrong navigation type'
		};

		switch (type)
		{
			case 'profile':
				displayBanner({
					msg: msg[type],
					type: 'info'
				}, setBanner);

				nav('/users/detailed' + '?id=' + id);

				break;

			case 'settings':
				nav('/settings');

				break;

			default:
				console.warn(msg['error']);

				nav('/eror404');
				break;
		}
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
					onClick={() => handleNav(nav, setBanner, 'profile')}>Moj Profil
				</li>
				<li className='p-2 cursor-pointer hover:bg-gray-100'
					onClick={() => handleNav(nav, setBanner, 'settings')}>
					Podešavanja
				</li>
				<li className='p-2 cursor-pointer hover:bg-gray-100' onClick={fn ? fn : () =>
				{
				}}>Odjavi se
				</li>
			</ul>
		</div>
	);
};

export default UserMenu;