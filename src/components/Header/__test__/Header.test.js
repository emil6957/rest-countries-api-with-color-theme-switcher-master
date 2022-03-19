import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";
import moonFilled from "../../../images/moon-filled.svg";
import moonOutline from "../../../images/moon-outline.svg";

describe("Header Component", () => {
    it("Header Title Renders", () => {
        render(
            <Header />
        );
        const titleElement = screen.getByRole("heading");
        expect(titleElement).toBeInTheDocument();
    });
    it("Moon Image Changes when button is clicked", () => {
        render(
            <Header />
        );
        const buttonElement = screen.getByRole("button");
        const imageElement = screen.getByRole("img");
        const firstImageSrc = imageElement.src;
        fireEvent.click(buttonElement)
        const secondImageSrc = imageElement.src;
        expect(firstImageSrc).toContain(moonOutline);
        expect(secondImageSrc).toContain(moonFilled); 
    })
})