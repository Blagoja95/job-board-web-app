import Button from "../../../../components/button/Button";
import {checkIfSessionLive, displayBanner, getID, handleDelete, openMail} from "../../../../utils/util/utils";
import React, {useContext} from "react";
import {BannerContext, LoginContext, ModalContext} from "../../../../App";
import {useNavigate} from "react-router-dom";
import {deleteCookie} from "../../../../utils/cookie/cookie";

const General = ({setSetting, user}) =>
{
	const {setModal} = useContext(ModalContext);
	const setBanner = useContext(BannerContext);
	const {setLogged} = useContext(LoginContext);
	const nav = useNavigate();

	return (
		<section className='flex flex-col gap-16 mx-auto w-4/5'>
			<h2 className='text-mint md:text-start text-center'>Informacije</h2>

			<div className='user-info flex flex-col gap-1 md:pl-4'>
				<p className='text-coolGray-dark'>Ime: <span
					className='text-coolGray-normal'>{user?.name ?? 'no_data'}</span>
				</p>
				<p className='text-coolGray-dark'>Korisničko ime: <span
					className='text-coolGray-normal'>{user?.username ?? 'no_data'}</span>
				</p>
				<p className='text-coolGray-dark'>Locale: <span
					className='text-coolGray-normal'>{navigator.language}</span>
				</p>
				<p className='text-coolGray-dark'>User agent: <span
					className='text-coolGray-normal'>{navigator.userAgent}</span>
				</p>
				<div>
					<div className='flex l:justify-start items-center gap-4 mt-8'>
						<p className='text-coolGray-normal w-[150px] md:w-32'>
							Prijavite problem.
						</p>
						<Button
							text="Pošalji mejl"
							className="text-blue-300 bg-white border-white hover:bg-blue-300 hover:text-white w-36"
							onClick={() => openMail('boris.blagojevicc@hotmail.com')}
						/>
					</div>
				</div>
			</div>

			<div className='flex flex-col gap-4 justify-center items-start'>
				<h2 className='text-mint md:text-start text-center'>Podešavanja</h2>

				<div className='flex l:justify-start items-center gap-4 md:pl-4'>
					<p className='text-coolGray-normal w-[150px] md:w-32'>
						Promjena lozinke
					</p>
					<Button className='text-coolGray-dark hover:text-wht'
							text='Promjeni'
							onClick={() => setSetting(1)}
					/>
				</div>

				<div className='flex l:justify-start items-center gap-4 md:pl-4'>
					<p className='text-coolGray-normal w-[150px] md:w-32'>
						Promjeni mejl adresu
					</p>
					<Button className='text-coolGray-dark hover:text-wht hover:bg-mint'
							text='Promjeni'
							onClick={() => setSetting(2)}
					/>
				</div>

				<div className='flex l:justify-start items-center gap-4 md:pl-4'>
					<p className='text-coolGray-normal w-[150px] md:w-32'>
						Promjena ostalih podatala
					</p>
					<Button className='text-coolGray-dark hover:text-wht hover:bg-mint'
							text='Promjeni'
							onClick={() => setSetting(3)}
					/>
				</div>
			</div>

			<div className='border-2 border-red-500 p-4 flex justify-center md:justify-start'>
				<Button className='text-white bg-red-500 border-red-500 hover:text-red-500 hover:bg-white'
						text='Obriši nalog'
						onClick={() =>
						{
							if (checkIfSessionLive(setBanner))
							{
								handleDelete(getID(), setModal, setBanner, nav, 'users/delete', 'Da li želite da obrišete Vaš nalog?',
									function (res)
									{
										if (res?.users?.status === 1)
										{
											setLogged([]);
											deleteCookie('username');
											deleteCookie('userID');

											displayBanner({
												msg: res?.users?.info ?? 'Uspješno ste obrisali Vaš račun! Prebacujemo vas na početnu stranicu.',
												type: 'success'
											}, setBanner);

											setTimeout(() =>
											{
												nav('/');
											}, 500);
										}
										else
										{
											displayBanner({
												msg: res.users?.info ?? 'Došlo je do greške!',
												type: 'error'
											}, setBanner);
										}
									})
							}
							else
							{
								nav('/');
							}
						}}
				/>
			</div>
		</section>
	);
}

export default General;