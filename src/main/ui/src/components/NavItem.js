const NavItem = ({ text, href }) => {
	return (
		<div className="nav-list pt-2.5 pb-2 text-coolGray-dark text-xs lg:text-sm"><a href={href} className="hover:text-mint">{text}</a></div>
	)
}

export default NavItem