const Button = (props) => {

    return <button className={"px-6 py-3 rounded-full border border-solid border-indigo-500/50 " + (props.className ? props.className : "")} onClick={() => props.onCLick()}>{props.text}</button>
};

export default Button;