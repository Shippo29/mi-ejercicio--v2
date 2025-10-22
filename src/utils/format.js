export function formatCLP(amount) {
  if (amount == null) return "";
  // redondear a entero y formatear con separador de miles '.'
  const n = Math.round(amount);
  return `$${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

export function applyDiscount(price, discount) {
  if (!discount) return price;
  return Math.round(price * (1 - discount));
}
