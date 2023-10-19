import "./index.css";
import Navigation from "./sections/Navigation";
import Footer from "./sections/Footer";
import Home from "./pages/Home";
import About from "./sections/About";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import Reviews from "./components/Reviews";

import {Routes, Route} from "react-router-dom";
import {useState, createContext} from "react";
import Register from "./components/Register";
import DetailedPost from "./components/DetailedPost";
import Modal from "./components/Modal";
import {createPortal} from "react-dom";
import {getLoginArray} from './cookie'
import Users from "./sections/Users";
import DetailedUser from "./components/DetailedUser";

export const PostsContext = createContext(null);
export const UsersContext = createContext(null);
export const LoginContext = createContext(null);
export const ModalContext = createContext(null);
export const DetailContext = createContext(null);

function App() {
	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const [cities, setCities] = useState([]);
	const [types, setTypes] = useState([]);
	const [logged, setLogged] = useState(getLoginArray(['username', 'userID']));
	const [modal, setModal] = useState(null);
	const [detailed, setDetailed] = useState(null);

	const postsValue = {posts, setPosts, cities, setCities, types, setTypes};

	return (
		<>
			<DetailContext.Provider value={{detailed, setDetailed}}>
				<PostsContext.Provider value={postsValue}>
					<UsersContext.Provider value={{users, setUsers}}>
						<LoginContext.Provider value={{logged, setLogged}}>
							<ModalContext.Provider value={{modal, setModal}}>

								<Navigation/>
								{(modal && Object.keys(modal).length > 0) ? createPortal(<Modal
									modalObj={modal}/>, document.getElementById('modal')) : null}
								<div className="forInner flex flex-row justify-center"></div>

								<Routes>
									<Route path="/" element={<Home/>}/>
									<Route path="/posts" element={<Home/>}/>
									<Route path="/users" element={<Users/>}/>
									<Route path="/about" element={<About/>}/>
									<Route path="/login" element={<Login/>}/>
									<Route path="/npost" element={<CreatePost create={true}/> }/>
									<Route path="/register" element={<Register/>}/>
									<Route path="/posts/detailed" element={<DetailedPost/>}/>
									<Route path="/users/detailed" element={<DetailedUser/>}/>
									<Route path="/update" element={<CreatePost/>}/>
									<Route path="/reviews" element={<Reviews/>}/>
								</Routes>

								<Footer/>

							</ModalContext.Provider>
						</LoginContext.Provider>
					</UsersContext.Provider>
				</PostsContext.Provider>
			</DetailContext.Provider>
		</>
	);
}

export default App;
