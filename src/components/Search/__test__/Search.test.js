import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../Search";

describe("Search Component", () => {
    it("Renders Input Element", () => {
        render(
            <Search />
        );
        const inputElement = screen.getByPlaceholderText(/Search for a country.../i);
        expect(inputElement).toBeInTheDocument();
    });

    it("Should Display Input Thats Typed", () => {
        render(
            <Search />
        );
        const inputElement = screen.getByPlaceholderText(/Search for a country.../i);
        fireEvent.change(inputElement, { target: { value: "Ukraine" } });
        expect(inputElement.value).toBe("Ukraine");
    });
})