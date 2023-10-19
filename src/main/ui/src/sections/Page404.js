import {useEffect, useState} from "react";

const Page404 = () => {

	const [color, setColor] = useState();

	useEffect(() => {
		const colors = [
			'text-yellow-300',
			'text-yellow-500',
			'text-orange-300',
			'text-orange-500',
			'text-red-300',
			'text-amber-300',
			'text-amber-500',
			'text-red-500',
		];

		const changeColor = (i) => {
			setColor(colors[i]);

			setTimeout(() => {
				const k = (i + 1) % colors.length;
				changeColor(k);
			}, 1500);
		};

		changeColor(0);

	}, []);


	return (
		<div className="flex items-center justify-center h-[60vh] bg-gray-light">
			<div className="text-center">
				<h1 className={`text-9xl font-bold ${color}`}>404</h1>
				<p className="text-2xl text-gray-600 mt-4">Stranica nije pronađena</p>
			</div>
		</div>
	);
};

export default Page404;