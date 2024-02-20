import {useState} from "react";

const Link = ({page, childredn}) => {
	const state = {
		HOVERED: 'hovered',
		NORMAL: 'normal'
	};

	const [status, setStatus] = useState(state.NORMAL);

	const onMouseEnter = () => {
		setStatus(state.HOVERED)
	};
	const onMouseLeave = () => {
		setStatus(state.NORMAL)
	};

	return <a className={status}
			  href={page || '#'}
			  onMouseEnter={onMouseEnter}
			  onMouseLeave={onMouseLeave}
	> {childredn}
	</a>
};

export default Link;