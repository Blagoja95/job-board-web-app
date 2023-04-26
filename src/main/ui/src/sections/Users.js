import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationArrow,
	faInfo
} from "@fortawesome/fontawesome-free-solid";
import Button from "../components/Button";

import { openMail } from '../utils';
import {useContext, useEffect} from "react";
import {UsersContext} from "../App";

const makeShortUsers = (users) => {
	return users.map(user => <User user={user} key={user.id} />)
};

const getUsers = (setUsers) => {
	fetch('http://localhost:8080/users')
.then(response => response.json())
	.then(data => setUsers(data.users));
}

const User = ({ user }) => {
	return <div className="flex flex-col gap-4 border rounded-xl w-80 m-auto py-2 px-4 hover:border-mint hover:border-2 min-h-[300px]">
		<h3 className="text-mint">{user.name}</h3>

		<div className="flex flex-row gap-5">
			<div className="flex flex-row items-center gap-2">
				<FontAwesomeIcon icon={faLocationArrow} className="text-coolGray-normal" />
				<h3 className="text-coolGray-normal">Mjesto:</h3>
			</div>

			<p>{user.city}</p>
		</div>

		<div>
			<div className="flex gap-2 items-center">
				<FontAwesomeIcon icon={faInfo} className="text-coolGray-normal" />
				<h3 className="text-coolGray-normal">O nama</h3>
			</div>

			<p className="my-4">{user.about}</p>
		</div>


		<Button text="Kontaktiraj" className="text-wht bg-mint w-44 m-auto" onClick={() => openMail(user.email)} />
	</div>
};

const Users = () => {
const {users, setUsers} = useContext(UsersContext);

	useEffect(() => {
		getUsers(setUsers);
	}, []);

	return (
		<div className="mt-20 w-2/3 m-auto grid grid-cols-3 gap-x-2 gap-y-8">
			{makeShortUsers(users)}
		</div>
	)
}

export default Users