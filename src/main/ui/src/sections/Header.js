import "react-widgets/styles.css";

const Header = () => {
	return (
		<section className="bg-gray-light md:h-96 z-10" id="top">
			<div className="py-20 md:py-28 text-center max-w-screen-sm m-auto px-6 lg:px-0">
				<h1 className="text-2xl md:text-4xl md:leading-snug pb-4 font-semibold text-coolGray-dark">Dobrodošli na najveću platformu za pretragu poslova u regionu</h1>
				<p className="font-normal text-gray-dark text-coolGray-normal">Stranica koja prikazuje ogroman broj oglasa za poslove iz raznih djelatnosti napravljeni od strane
				velikog broja kompanija iz cjele regije koje redovno objavljivaju oglase i možda trebaju baš vas! </p>
			</div>
		</section>
	)
};

export default Header;