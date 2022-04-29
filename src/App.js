import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";

function App() {
	const [countries, setCountries] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch("https://restcountries.com/v3.1/all")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setCountries(data);
				setLoading(false);
			})
	}, [])

	function toggleDarkMode() {
		setIsDarkMode(prevState => !prevState);
	}

	return (
		<Router>
			<div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
				<Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
				<Routes>
					<Route path="/" element={<Home loading={loading} isDarkMode={isDarkMode} countries={countries} />} />
					<Route path="/details/:name" element={<Details countries={countries} />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
