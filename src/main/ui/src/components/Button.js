const Button = (props) => {

    return <button className={"px-6 py-3 rounded-full border bg-mint border-solid border-mint text-white hover:bg-white hover:text-mint" + (props.className ? props.className : "")} onClick={() => props.onCLick()}>{props.text}</button>
};

export default Button;