import "./index.css";
import Navigation from "./sections/Navigation";
import Footer from "./sections/Footer";
import Home from "./pages/Home";
import Companies from "./pages/Companies"
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";

function App() {
	return (
		<>
			<Navigation />
			<div id="forWindow"></div>
			<div className="forInner"></div>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/posts" element={<Home />} />
				<Route path="/users" element={<Companies />} />
				<Route path="/about" element={<About />} />
			</Routes>

			<Footer />
		</>
	);
}

export default App;
