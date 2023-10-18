const Footer = () => {
	return (
		<section className="w-full flex md:flex-row justify-center py-10">

			<div className="flex flex-col-reverse md:flex-row justify-between w-5/6 px-4 sm:px-16 py-10 border-t-2 items-center gap-8 md:gap-0 text-xs lg:text-base">
				<div className="flex flex-col-reverse items-center sm:flex-row gap-4">
					<img src="logo192.png" alt="logo" width={44}/>
					<p className="text-center">&#169;{new Date().getFullYear()} Trebas posao. Sva prava zadržana</p>
				</div>

				<div className="flex flex-col md:flex-row gap-1 items-center md:gap-4">
					<div><a href="/" className="hover:text-mint">Početna</a></div>
					<div className="hidden md:block">|</div>
					<div><a href="#top" className="hover:text-mint">Vrati me na vrh</a></div>
					<div className="hidden md:block">|</div>
					<div><a href="/About" className="hover:text-mint">Informacije</a></div>
				</div>
			</div>
		</section>
	)
}
export default Footer