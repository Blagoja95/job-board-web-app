import Button from "../../../../components/button/Button";
import {handleDelete} from "../../../../utils/util/utils";
import {useContext} from "react";
import {BannerContext, ModalContext} from "../../../../App";
import {useNavigate} from "react-router-dom";
const General = ({getID, setSetting}) =>
{
	const {setModal} = useContext(ModalContext);
	const setBanner = useContext(BannerContext);
	const nav = useNavigate();

	return (
		<section className='flex flex-col gap-16 mx-auto w-4/5'>
			<h2 className='text-coolGray-normal'>Podešavanja</h2>

			<div className='flex flex-col gap-4 justify-center items-start'>
				<Button className='text-coolGray-dark hover:text-wht hover:bg-mint min-w-[240px]'
						text='Promjeni lozinku'
						onClick={() => setSetting(1)}
				/>

				<Button className='text-coolGray-dark hover:text-wht hover:bg-mint min-w-[240px]'
						text='Promjeni mejl adresu'
						onClick={() => setSetting(2)}
				/>

				<Button className='text-coolGray-dark hover:text-wht hover:bg-mint min-w-[240px]'
						text='Promjena ostalih podatala'
						onClick={() => setSetting(3)}
				/>
			</div>

			<div className='border-2 border-red-500 p-4'>
				<Button className='text-white bg-red-500 border-red-500 hover:text-red-500 hover:bg-white'
						text='Obriši nalog'
						onClick={() => handleDelete(getID(setBanner), setModal, setBanner, nav, 'users', 'Da li želite da obrišete Vaš nalog?')}
				/>
			</div>

		</section>
	);
}

export default General;