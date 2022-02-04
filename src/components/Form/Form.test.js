import Form from "./Form";
import { render, fireEvent, screen } from "@testing-library/react";

it("Should have 3 inputs", () => {
  render(<Form />);

  const inputs = document.querySelectorAll("input");
  expect(inputs.length).toEqual(3);
});

it("Should have placeholer equals 'Email or phone number' ", () => {
  render(<Form />);
  const EmailOrNumberInput = document.querySelectorAll(
    'input[placeholder="Email or phone number"]'
  );

  expect(EmailOrNumberInput[0].getAttribute("placeholder")).toBe(
    "Email or phone number"
  );
});

it("Should have placeholder equals 'Password' ", () => {
  render(<Form />);

  const passInput = document.querySelectorAll(
    'input[placeholder="Password"'
  )[0];

  expect(passInput.getAttribute("placeholder")).toBe("Password");
});

it("Should have checkbox enabling tick or untick itself", () => {
  render(<Form />);

  let checkbox = document.getElementById("rememberMe");
  expect(checkbox.checked).toBe(false);

  fireEvent.select(checkbox, { target: { checked: true } });

  checkbox = document.getElementById("rememberMe");

  expect(checkbox.checked).toBe(true);
});
