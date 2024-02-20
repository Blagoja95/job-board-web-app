const NavItem = ({text, href}) =>
{
	return (
		<li className='nav-list pt-2.5 pb-2 text-coolGray-dark text-xs lg:text-sm list-none select-none active:scale-95'>
			<a
				href={href}
				className='hover:text-mint'>{text}
			</a>
		</li>
	)
}

export default NavItem