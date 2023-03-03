const Button = (props) => {

	return <button className={"px-6 py-3 rounded-full border border-solid border-mint hover:bg-keppel hover:text-wht" + (props.className ? " " + props.className : "")} onClick={() => props.onCLick()}>{props.text}</button>
};

export default Button;