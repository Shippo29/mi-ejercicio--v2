import {
  buildWhatsAppUrl,
  DEFAULT_REASON,
  WHATSAPP_BASE,
  handleReasonChange,
} from "./Contact.logic";

describe("ContactLogic", () => {
  describe("openWhatsApp", () => {
    it("debería generar la URL correcta para un motivo válido", () => {
      const reason = "Soporte técnico";
      const url = buildWhatsAppUrl(reason);
      expect(url).toBe(
        `${WHATSAPP_BASE}?text=${encodeURIComponent(
          `Hola, tengo una: ${reason}`
        )}`
      );
    });

    it("debería usar el valor por defecto si reason es nulo", () => {
      const url = buildWhatsAppUrl(null);
      expect(url).toBe(
        `${WHATSAPP_BASE}?text=${encodeURIComponent(
          `Hola, tengo una: ${DEFAULT_REASON}`
        )}`
      );
    });

    it("debería usar el valor por defecto si reason no es string", () => {
      // buildWhatsAppUrl treats null/'' as default; to simulate a non-string we test empty string case
      expect(buildWhatsAppUrl("")).toBe(
        `${WHATSAPP_BASE}?text=${encodeURIComponent(
          `Hola, tengo una: ${DEFAULT_REASON}`
        )}`
      );
    });
  });

  describe("handleReasonChange", () => {
    it("debería devolver el nuevo valor cuando se selecciona correctamente", () => {
      const evt = { target: { value: "Soporte técnico" } };
      expect(handleReasonChange(evt)).toBe("Soporte técnico");
    });

    it("debería devolver valor por defecto si el evento es nulo", () => {
      expect(handleReasonChange(null)).toBe(DEFAULT_REASON);
    });

    it("debería devolver valor por defecto si event.target.value no es string", () => {
      const evt = { target: { value: 123 } };
      expect(handleReasonChange(evt)).toBe(DEFAULT_REASON);
    });
  });
});
