import React from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import moonOutline from "../../images/moon-outline.svg";
import moonFilled from "../../images/moon-filled.svg";

export default function Header({ isDarkMode, toggleDarkMode }) {
    const moon = isDarkMode ? <svg xmlns="http://www.w3.org/2000/svg" className="header__moon" viewBox="0 0 512 512"><title>Moon</title><path fill="#FFF" d="M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z"/></svg>
        : <svg xmlns="http://www.w3.org/2000/svg" className="header__moon" viewBox="0 0 512 512"><title>Moon</title><path d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>

    return (
        <header className="header">
            <div className="header__title-wrapper">
                <img className="header__logo" src={logo} alt="logo" />
                <h1 className="header__title">Where in the world?</h1>
            </div>
            <button onClick={toggleDarkMode} className="header__btn">
                {/* <img className="header__moon" src={isDarkMode ? moonFilled : moonOutline} alt={isDarkMode ? "filled in moon" : "outline of a moon" } /> */}
                {moon}
                <p className="header__btn-text">Dark Mode</p>
            </button>
        </header>
    )
}