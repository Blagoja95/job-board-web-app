const NavItem = ({ text, href }) => {
	return (
		<div className="nav-list pt-2.5 pb-2 text-coolGray-dark md:text-sm"><a href={href} className="hover:text-mint">{text}</a></div>
	)
}

export default NavItem