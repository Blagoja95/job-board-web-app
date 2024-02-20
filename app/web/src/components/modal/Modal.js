import Button from '../button/Button';

const Modal = ({modalObj}) =>
{

	return (
		<div
			className='fixed top-1 left-1 w-full h-full flex justify-center items-center z-20'>
			<div className=''>
				<p>{modalObj.text}</p>

				<div className='flex flex-row justify-center gap-4 pt-12'>
					<Button
						text={modalObj.btn1Txt}
						onClick={() => modalObj.btn1Fn()}
						className='text-wht bg-mint'/>

					<Button
						text={modalObj.btn2Txt}
						onClick={() => modalObj.btn2Fn()}
						className='text-wht bg-redwood-normal border-redwood-normal hover:bg-redwood-light'/>
				</div>
			</div>
		</div>
	)
}

export default Modal;