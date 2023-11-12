import Button from "../../../components/button/Button";
import {useNavigate} from "react-router-dom";

const NoSettings = ({fn}) =>
{
	return <div className='h-[60vh] flex justify-center items-center'>
		<div className='flex flex-col gap-4'>
			<p className='text-coolGray-dark text-xl uppercase'>Trenutno nije dostupno</p>

			<Button text='Vrati me nazad' className='text-mint' onClick={fn} key='return-me-key-1'/>
		</div>
	</div>
};

export default NoSettings;