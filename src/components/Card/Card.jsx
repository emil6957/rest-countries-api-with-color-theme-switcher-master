import React from "react";
import "./Card.css";

export default function Card({ name, population, region, capital, flag }) {
    // Adds commas into number
    const splitPop = population.toString().split("."); // Turns the population into a string inside a single element array
    splitPop[0] = splitPop[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") // \B = the space before the letter | ?=(\d{3}) looks ahead for 3 consecutive numbers | ?!\d looks aheaad for no number
    const stringPopulation = splitPop.join(".");

    return (
        <div className="card">
            <img className="card__flag" src={flag} alt={`flag of ${name}`} />
            <h3 className="card__name">{name}</h3>
            <p className="card__info card_population"><span className="card--bold">Population:</span> {stringPopulation}</p>
            <p className="card__info card__region"><span className="card--bold">Region:</span> {region}</p>
            <p className="card__info card__capital"><span className="card--bold">Capital:</span> {capital || "n/a"}</p>
        </div>
    )
}