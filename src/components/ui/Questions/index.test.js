import { render, fireEvent, screen } from "@testing-library/react";
import Container from ".";

it("Should return questions if isFAQ equals true", () => {
  render(<Container isFAQ />);

  const header = document.getElementsByTagName("h3");

  expect(header.length).toEqual(1);
});

it("Should return header and paragraph if isFAQ equals false", () => {
  render(<Container />);

  const header = document.getElementsByTagName("h3");
  const p = document.getElementsByTagName("p");

  expect(header.length).toEqual(1);
  expect(p.length).toEqual(1);
});

it("Should change state if plus icon clicked", () => {
  render(<Container isFAQ />);

  const icon = screen.getByTestId("icon");

  console.log(icon.length);
});
it("Should show text if plus icon clicked", () => {});
