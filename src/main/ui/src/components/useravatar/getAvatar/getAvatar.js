import ImageAvatar from "../ImageAvatar/ImageAvatar";
import InitialsAvatar from "../InitialsAvatar/InitialsAvatar";

export const getAvatar = (user, className = '', randomColor = false) =>
{
	if (user?.img)
	{
		return <ImageAvatar src={user.img} className={className}/>;
	}
	else
	{
		return <InitialsAvatar name={user.name} className={className} randomColor={randomColor}/>
	}
}