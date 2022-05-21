import React, { useEffect, useState } from "react";
import "./Details.css";
import { nanoid } from "nanoid";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export default function Details({ countries }) {
    const [loading, setLoading] = useState(true);
    const [country, setCountry] = useState();
    const [borders, setBorders] = useState([]);
    const { name } = useParams();

    useEffect(() => {
        setLoading(true);
        setCountry();
        setBorders([]);
        async function getData() {
            const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
            const data = await res.json();
            await setCountry(data[0]);
            await setLoading(false);
        }
        const unSub = getData();
        return () => unSub;
    }, [name])

    useEffect(() => {
        async function getBorders() {
            const promises = await country.borders.map(async (border) => {
                const res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
                const data = await res.json();
                return data[0].name.common;
            })
            const borders = await Promise.all(promises);
            setBorders(borders);
        }
        if(loading === false && country.borders) {
            getBorders();
        }
    }, [loading, country]);

    const borderElements = borders.map(border => <Link className="details__border" key={nanoid()} to={`/details/${border}`}>{border}</Link>)

    let stringPopulation = "";
    let currencies = [];
    let languages = [];
    let nativeName = "";
    if(loading === false) {
        const splitPop = country.population.toString().split("."); // Turns the population into a string inside a single element array
        splitPop[0] = splitPop[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") // \B = the space before the letter | ?=(\d{3}) looks ahead for 3 consecutive numbers | ?!\d looks aheaad for no number
        stringPopulation = splitPop.join(".");
        const currencyKeys = Object.keys(country.currencies);
        const languageKeys = Object.keys(country.languages);
        currencyKeys.forEach(key => currencies.push(country.currencies[key].name))
        currencies = currencies.join(", ");
        languageKeys.forEach(key => languages.push(country.languages[key]))
        languages = languages.join(", ");
        nativeName = country.name.nativeName[languageKeys[0]].common;
    }


    return (
        <div className="details">
            <Link to="/" className="details__back-btn">
                <svg xmlns="http://www.w3.org/2000/svg" className="details__arrow" viewBox="0 0 512 512"><title>Arrow Back</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"/></svg>
                <p className="details__back-btn-text">Back</p>
            </Link>
            {loading ? <div style={{display: "flex"}}><Spinner className="details__spinner" animation="border" size="lg" /></div> : (
                <div className="details__content">
                    <img className="details__flag" src={country.flags.svg} alt={`${country.name.common} flag`}/>
                    <div className="details__info">
                        <h2 className="details__name">{country.name.common}</h2>
                        <div className="details__lists-container">
                            <ul className="details__list">
                                <li><span className="details__bold">Native Name: </span>{nativeName}</li>
                                <li><span className="details__bold">Population: </span>{stringPopulation}</li>
                                <li><span className="details__bold">Region: </span>{country.region}</li>
                                <li><span className="details__bold">Sub Region: </span>{country.subregion}</li>
                                <li><span className="details__bold">Capital: </span>{country.capital[0] || "n/a"}</li>
                            </ul>
                            <ul className="details__list">
                                <li><span className="details__bold">Top Level Domain: </span>{country.tld[0]}</li>
                                <li><span className="details__bold">Currencies: </span>{currencies}</li>
                                <li><span className="details__bold">Languages: </span>{languages}</li>
                            </ul>
                        </div>
                        <div className="details__borders">
                            <h3 className="details__borders-header">Border Countries:</h3>
                            { country.borders ? (
                                    <div className="details__borders-container">
                                        {borders.length ? borderElements : <Spinner className="details__border-spinner" animation="border" size="lg" />}
                                    </div>
                                )
                                : (
                                    <p>n/a</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}