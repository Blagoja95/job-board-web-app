const Button = (props) =>
{

	return <button name={props.name ? props.name : 'button'}
				   className={"lg:px-6 lg:py-3 px-3 py-1 rounded-full border border-solid border-mint hover:bg-keppel hover:text-wht" + (props.className ? " " + props.className : "")}
				   onClick={() => props.onClick()}>{props.text}</button>
};

export default Button;