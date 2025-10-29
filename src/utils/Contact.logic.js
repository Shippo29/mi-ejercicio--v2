export const WHATSAPP_BASE = "https://wa.me/56936113298";
export const DEFAULT_REASON = "Consulta sobre producto";

/**
 * Construye la URL de WhatsApp para abrir con el texto prellenado.
 * - Si `reason` es null o cadena vacía, usa DEFAULT_REASON.
 * - Escapa correctamente con encodeURIComponent.
 *
 * @param {string} [reason]
 * @returns {string} URL completa para abrir en WhatsApp
 */
export function buildWhatsAppUrl(reason) {
  const r = reason == null || reason === "" ? DEFAULT_REASON : reason;
  const msg = encodeURIComponent(`Hola, tengo una: ${r}`);
  return `${WHATSAPP_BASE}?text=${msg}`;
}

/**
 * Maneja un evento de cambio del select y devuelve el nuevo valor válido.
 * - Si el evento es inválido o no tiene target.value como string, devuelve DEFAULT_REASON.
 * - Si se entrega una cadena vacía, devuelve DEFAULT_REASON.
 *
 * @param {Event|null|undefined} event
 * @returns {string}
 */
export function handleReasonChange(event) {
  if (!event || !event.target) return DEFAULT_REASON;
  const v = event.target.value;
  if (typeof v !== "string" || v === "") return DEFAULT_REASON;
  return v;
}

// export por compatibilidad y pruebas
const ContactLogic = {
  WHATSAPP_BASE,
  DEFAULT_REASON,
  buildWhatsAppUrl,
  handleReasonChange,
};

export default ContactLogic;
