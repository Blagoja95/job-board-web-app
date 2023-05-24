import Button from "./Button";

const Modal = () => {
	document.getElementById('root').className = "blur-lg";

	return (
		<div className="absolute top-2/4 right-2/4 translate-x-2/4 -translate-y-2/4 w-full h-full flex justify-center items-center z-20">
			<div className="">
				<p>Do you want to delete this Post</p>

				<div>
					<Button
						text="Yes"
						className="text-wht bg-mint" />

					<Button
						text="No"
						className="text-wht bg-redwood-normal border-redwood-normal hover:bg-redwood-light" />
				</div>
			</div>
		</div>
	)
}

export default Modal;