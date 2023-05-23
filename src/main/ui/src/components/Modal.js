import Button from "./Button";

const Modal = () => {
    return (
        <div className="absolute">
           <p>Do you want to delete this Post</p>

            <div>
                <Button
                    text="Yes"
                    className="text-wht bg-mint"/>

                <Button
                    text="No"
                    className="text-wht bg-redwood-normal border-redwood-normal hover:bg-redwood-light"/>
            </div>
        </div>
    )
}

export default Modal;