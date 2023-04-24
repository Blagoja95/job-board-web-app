import "./index.css";
import Navigation from "./sections/Navigation";
import Footer from "./sections/Footer";
import Home from "./pages/Home";
import Companies from "./pages/Companies"
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import {useEffect, useState,  createContext} from "react";

export const PostsContext = createContext(null);
export const UsersContext = createContext(null);

function App() {
	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const [cities, setCities] = useState([]);
	const [types, setTypes] = useState([]);

	const postsValue = {posts, setPosts, cities, setCities, types, setTypes}

	return (
		<>
			<Navigation />
			<div id="forWindow"></div>
			<div className="forInner"></div>
			<PostsContext.Provider value={postsValue}>
			<UsersContext.Provider value={{users, setUsers}}>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/posts" element={<Home />} />
				<Route path="/users" element={<Companies />} />
				<Route path="/about" element={<About />} />
			</Routes>

			</UsersContext.Provider>
			</PostsContext.Provider>
			<Footer />
		</>
	);
}

export default App;
