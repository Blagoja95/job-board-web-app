import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationArrow,
	faInfo
} from "@fortawesome/fontawesome-free-solid";
import Button from "../components/Button";

import { openMail } from '../utils';

const makeShortUsers = (users) => {
	return users.map(user => <User user={user} key={user.id} />)
}

const User = ({ user }) => {
	return <div className="flex flex-col gap-4 border rounded-xl w-80 m-auto py-2 px-4 hover:border-mint hover:border-2">
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
	return (
		<div className="mt-20 w-2/3 m-auto grid grid-cols-3 gap-x-2 gap-y-8">
			{makeShortUsers(users)}
		</div>
	)
}

export default Users

// TODO: remove later

const users = [
	{
		id: 2022,
		name: "Tritol",
		email: "some@mail.com",
		about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		city: "Doboj",
	},
	{
		id: 231,
		name: "Comp1",
		email: "some@mail.com",
		about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		city: "Banja Luka",
	},
	{
		id: 1873,
		name: "TriBi",
		email: "some@mail.com",
		about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
		city: "Prijedor",
	},
	{
		id: 156,
		name: "ITAll",
		email: "some@mail.com",
		about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
		city: "Zvornik",
	},
	{
		id: 123,
		name: "InterPRO",
		email: "some@mail.com",
		about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		city: "Banja Luka",
	},
	{
		id: 33,
		name: "Klik tel",
		email: "some@mail.com",
		about: "Lorem ipsum dolor sit amet,  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		city: "Banja Luka",
	}
];