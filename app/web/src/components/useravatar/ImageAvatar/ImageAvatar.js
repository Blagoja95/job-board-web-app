const ImageAvatar = ({src, className}) => {

	return <img className={className + ' w-[44px] sm:w-[64px]'} src={src} alt='User avatar'></img>
}

export default ImageAvatar;