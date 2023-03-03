import { Combobox } from "react-widgets";
import Button from "./Button";

const SearchBar = (props) => {
	return (
		<div className="flex flex-row justify-between gap-8 search-shadow border max-w-screen-lg m-auto -mt-9 py-7 md:py-10 px-6 border job-shadow rounded-3xl bg-white border-gray-light ">
			<Combobox placeholder={"Pretraga po lokaciji"} />

			<Combobox placeholder={"Pretraga po aražmanu"} />

			<input
				type="text"
				placeholder="Pretraga po naslovu ..."
				className="border-2 focus:border-mint outline-none pl-2 rounded-xl h-[40px] w-64"
			></input>

			<Button text={"Pretraži"} className="bg-mint text-wht" />
		</div>
	);
};

export default SearchBar;
