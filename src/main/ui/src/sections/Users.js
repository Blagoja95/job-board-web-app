import {useContext, useEffect} from "react";
import {UsersContext, PostsContext} from "../App";
import UserShort from "../components/UserShort";
import {useNavigate} from "react-router-dom";
import SearchBar from "../components/SearchBar";
import {removeDuplicates} from "../utils";

const getUsers = (setUsers, setCities) => {
    fetch('http://localhost:8080/users')
        .then(response => response.json())
        .then(data => {
            setUsers(data.users);
        });
}

const Users = () => {
    const {users, setUsers} = useContext(UsersContext);
    const {setPosts, setCities} = useContext(PostsContext);
    const nav = useNavigate();

    useEffect(() => {
        getUsers(setUsers, setCities);
    }, []);

    const makeShortUsers = (users) => {
        return users.map((user, i) => <UserShort user={user} key={user.id + '_' + user.name.replace(' ', '_') + '_' + i}
                                                 openDetailedUser={() => nav('/users/detailed' + '?id=' + user.id)}/>)
    };

    if (!Array.isArray(users) || users.length < 1)
    {
        return <p className={"text-mint font-bold text-2xl text-center py-20"}>Currently there is no users to show!</p>
    }

    return (<>
            <div className="bg-gray-light h-96 z-10" id="top">
                <SearchBar uri={'users'} cmbTypeOn={false}/>
            </div>
            <div className="py-20">
                {makeShortUsers(users)}
            </div>
        </>
    )
}

export default Users