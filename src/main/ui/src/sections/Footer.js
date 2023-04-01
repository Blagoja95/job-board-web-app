const Footer = () => {
	return (
		<section className="w-full flex flex-row justify-center py-10">

			<div className="flex flex-row justify-between w-5/6 px-16 py-10 border-t-2">
				<div className="flex flex-row gap-4">
					<img src="" alt="logo" />
					<p>&#169;{new Date().getFullYear()} Trebas posao. Sva prava zadržana</p>
				</div>

				<div className="flex flex-row gap-4">
					<div><a href="Pocetna" className="hover:text-mint">Početna</a></div>
					<div>|</div>
					<div><a href="#top" className="hover:text-mint">Vrati me na vrh</a></div>
					<div>|</div>
					<div><a href="/about" className="hover:text-mint">Informacije</a></div>
				</div>
			</div>
		</section>
	)
}
export default Footer