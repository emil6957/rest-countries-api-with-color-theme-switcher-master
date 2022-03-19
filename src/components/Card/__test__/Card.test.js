import { render, screen } from "@testing-library/react";
import Card from "../Card";

describe("Card Component", () => {
    it("Card Component Renders", () => {
        render(
            <Card />
        )
        expect(true).toBeTruthy();
    })
});