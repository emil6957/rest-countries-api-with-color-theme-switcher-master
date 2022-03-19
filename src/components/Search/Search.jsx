import "./Search.css";
import React, { useState } from "react";
import search from "../../images/search.svg";

export default function Search({ filter, handleChange, isDarkMode }) {
    const searchImg = <svg xmlns="http://www.w3.org/2000/svg" class="search__img" viewBox="0 0 512 512"><title>Search</title><path fill={isDarkMode ? "#FFF" : "#AAA"} d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z"/></svg>

    return (
        <div className="search">
            <div className="search__input-container">
                {/* <img className="search__img" src={search} alt="magnifying glass" /> */}
                {searchImg}
                <input onChange={(e) => handleChange(e)} autoComplete="off" name="country" className="search__input" value={filter.country} type="text" placeholder="Search for a country..."/>
            </div>
            <div className="search__dropdown-container">
                <select onChange={(e) => handleChange(e)} className="search__dropdown" value={filter.region} name="region" id="region">
                    <option value="" disabled hidden>Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
        </div>
    )
}