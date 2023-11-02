import {openMail} from "../utils";
import Button from "../components/Button";
import React from "react";

const About = () =>
{
	return (
		<section>
			<div className="mx-auto w-3/4 flex justify-center md:h-[60vh]">
				<div className="flex flex-col gap-4 mt-6 border-t-2">
					<h1 className="text-mint text-center md:text-left pt-4 md:pt-24">O autoru</h1>

					<p>
						<a href={'https://www.borisblagojevic.me'} target={'_blank'}
						   className='hover:text-mint font-semibold'>Boris Blagojević</a> rođen je 22. septembra 1995.
						godine u Banjoj Luci. Završio je osnovnu školu u Banjoj Luci, nakon čega je upisao Srednju
						elektrotehničku školu "Nikola Tesla" takođe u Banjoj Luci, gdje je stekao zvanje tehničara
						telekomunikacija i maturirao 2014. godine.
					</p>

					<p>
						Nakon završetka srednje škole, Boris se upisao na Fakultet informacionih tehnologija
						Panevropskog univerziteta Apeiron u Banjoj Luci, gdje je u akademskoj godini 2016-2017. započeo
						studije poslovne informatike. Kasnije se prebacio na novo formirani smjer inženjering
						informacionih tehnologija u akademskoj 2019-2020. godini koji i završava u Maju mjesecu 2023.
						godine.
					</p>

					<p>
						Radi u struci kao Softverski Inženjer. Tokom svog akademskog i profesionalnog puta, Boris je
						pokazao veliki interes prema tehnologiji i sklonost ka rješavanju problema u oblasti
						informacionih tehnologija.
					</p>
				</div>
			</div>

			<div className='m-auto w-3/4 flex justify-end'>
				<Button
					text="Mail"
					className="text-blue-300 bg-white border-white hover:bg-blue-300 hover:text-white w-36"
					onClick={() => openMail('boris.blagojevicc@hotmail.com')}
				/>

				<Button
					text="Instagram"
					className="text-red-300 bg-white border-white hover:bg-red-300 hover:text-white w-36"
					onClick={() => window.open('https://www.instagram.com/_b.blagojevic/', '_blank')}
				/>
			</div>

		</section>
	);
};

export default About;