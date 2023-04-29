const Button = (props) => {

	return <button name={props.name ? props.name : 'button'} className={"px-6 py-3 rounded-full border border-solid border-mint hover:bg-keppel hover:text-wht" + (props.className ? " " + props.className : "")} onClick={() => props.onClick()}>{props.text}</button>
};

export default Button;