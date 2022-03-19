import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import "./Home.css";
import Search from "../Search/Search";
import Card from "../Card/Card";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

export default function Home({ loading, isDarkMode, countries }) {
    const [filteredCountries, setFilteredCountries] = useState(countries);
    const [filter, setFilter] = useState({
        country: "",
        region: "",
    })

    useEffect(() => {
        if(filter.region) {
            setFilteredCountries(countries.filter(country => country.region === filter.region));
        } else {
            setFilteredCountries(countries);
        }
        if(filter.country) {
            setFilteredCountries(prevCountries => prevCountries.filter((country) => country.name.common.match(RegExp(filter.country, "ig")) ? country : ""));
        }
    }, [filter]);

    useEffect(() => {
        setFilteredCountries(countries);
    }, [countries]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFilter(prevFilter => ({ ...prevFilter, [name]: value }))
    }

    const countryElements = filteredCountries.map(country => (
        <Link key={nanoid()} className="home__card-link" to={`/details/${country.name.common}`}>
            <Card 
                name={country.name.common} 
                population={country.population} 
                region={country.region} 
                capital={country.capital} 
                flag={country.flags.svg}
            />
        </Link>)
    );

    return (
        <div className="home">
            <Search filter={filter} handleChange={(e) => handleChange(e)} isDarkMode={isDarkMode} />
            <div className="home__cards-container">
				{loading ? <Spinner className="home__spinner" variant={isDarkMode ? "light" : "dark"} animation="border" size="lg" /> : countryElements }
            </div>
        </div>
    )
}