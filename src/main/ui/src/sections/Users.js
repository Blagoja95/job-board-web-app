import {useContext, useEffect} from "react";
import {UsersContext} from "../App";
import UserShort from "../components/UserShort";
import {useNavigate} from "react-router-dom";
import navigation from "./Navigation";

const getUsers = (setUsers) => {
    fetch('http://localhost:8080/users')
        .then(response => response.json())
        .then(data => setUsers(data.users));
}

const Users = () => {
    const {users, setUsers} = useContext(UsersContext);
    const nav = useNavigate();

    useEffect(() => {
        getUsers(setUsers);
    }, []);

    const makeShortUsers = (users) => {
        return users.map((user, i) => <UserShort user={user} key={user.id + '_' + user.name.replace(' ', '_') + '_' + i} openDetailedUser={() => nav('/user/detailed' + '?id=' + user.id)}/>)
    };

    if(!Array.isArray(users) || users.length < 1)
        return <p className={"text-mint font-bold text-2xl text-center py-20"}>Currently there is no users to show!</p>

    return (
        <div className="">
            {makeShortUsers(users)}
        </div>
    )
}

export default Users