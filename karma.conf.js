module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      "src/utils/**/*.js", // Incluye la lógica primero
      "!src/utils/**/*.spec.js", // Excluir specs dentro de utils para evitar duplicados
      "src/**/*.spec.js", // Luego los archivos de prueba
    ],
    reporters: ["spec"], // Reporter legible
    browsers: ["ChromeHeadless"], // Ejecuta en modo invisible
    singleRun: true, // Corre una vez y termina
    concurrency: Infinity,
  });
};
