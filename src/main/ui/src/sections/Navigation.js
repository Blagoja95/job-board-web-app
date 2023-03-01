import React from "react";

const Navigation =  () => {
    return (
        <div className="flex flex-row justify-between pt-8 pb-12 px-24">
            <div className="image"></div>
            
            <ul className="nav-ul w-2/6 flex flex-row justify-around">
                <li className="nav-list"><a href="">Početna</a></li>
                <li className="nav-list"><a href="">Poslovi</a></li>
                <li className="nav-list"><a href="">Kompanije</a></li>
                <li className="nav-list"><a href="">Informacije</a></li>
            </ul>

            <div className="register">
                <button className="btn-create-ad pr-4">Objavi oglas</button>
                <button className="btn-login">Prijava</button>
            </div>
        </div>
    )
};

export default Navigation;