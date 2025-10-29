import { render, screen } from "@testing-library/react";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { MemoryRouter } from "react-router-dom";

test("App renders home content", () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </MemoryRouter>
  );
  // Home page should show a promo heading
  const promo = screen.getByText(/Hasta 20% OFF/i);
  expect(promo).toBeInTheDocument();
});
