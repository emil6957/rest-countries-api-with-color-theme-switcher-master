import { render, screen } from "@testing-library/react";
import Home from "../Home";

describe("Home Component", () => {
    it("Home Renders", () => {
        render(
            <Home />
        )
        expect(true).toBeTruthy();
    });
})
