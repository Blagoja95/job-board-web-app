import "./index.css";
import Navigation from "./sections/navigation/Navigation";
import Footer from "./sections/footer/Footer";
import Home from "./pages/Home";
import About from "./sections/about/About";
import Login from "./components/create/user/login/Login";
import CreatePost from "./components/create/post/CreatePost";
import Reviews from "./components/review/Reviews";
import {Routes, Route} from "react-router-dom";
import {useState, createContext} from "react";
import Register from "./components/create/user/register/Register";
import DetailedPost from "./sections/detailed/post/DetailedPost";
import Modal from "./components/modal/Modal";
import {createPortal} from "react-dom";
import {getLoginArray} from './utils/cookie/cookie'
import Users from "./sections/grid/user/Users";
import DetailedUser from "./sections/detailed/user/DetailedUser";
import Page404 from "./sections/error/Page404";
import CookiePopup from "./components/banner/cookie/CookiePopup";
import Banner from "./components/banner/msg/Banner";

export const PostsContext = createContext(null);
export const UsersContext = createContext(null);
export const LoginContext = createContext(null);
export const ModalContext = createContext(null);
export const DetailContext = createContext(null);
export const BannerContext = createContext(null);

function App() {
	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const [cities, setCities] = useState([]);
	const [types, setTypes] = useState([]);
	const [logged, setLogged] = useState(getLoginArray(['username', 'userID']));
	const [modal, setModal] = useState(null);
	const [detailed, setDetailed] = useState(null);
	const [banner, setBanner] = useState({show: false});

	const postsValue = {posts, setPosts, cities, setCities, types, setTypes};

	return (
		<>
			<DetailContext.Provider value={{detailed, setDetailed}}>
				<PostsContext.Provider value={postsValue}>
					<UsersContext.Provider value={{users, setUsers}}>
						<LoginContext.Provider value={{logged, setLogged}}>
							<ModalContext.Provider value={{modal, setModal}}>
								<BannerContext.Provider value={setBanner}>

								<Navigation/>
								{(modal && Object.keys(modal).length > 0) ? createPortal(<Modal
									modalObj={modal}/>, document.getElementById('modal')) : null}
								<div className="forInner flex flex-row justify-center"></div>

								<Banner show={banner?.show} type={banner?.type} message={banner?.msg} />

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
									<Route path="*" element={<Page404/>}/>
								</Routes>

								<CookiePopup/>

								<Footer/>

								</BannerContext.Provider>
							</ModalContext.Provider>
						</LoginContext.Provider>
					</UsersContext.Provider>
				</PostsContext.Provider>
			</DetailContext.Provider>
		</>
	);
}

export default App;
