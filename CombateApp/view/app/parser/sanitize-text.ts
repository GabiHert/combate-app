export function sanitizeText(value: string): string {
  return !value
    ? ""
    : value
        .normalize("NFD") // separa os acentos das letras
        .replace(/[\u0300-\u036f]/g, "") // remove os acentos
        .toUpperCase(); // deixa tudo em maiúsculo
}

export function sanitizeTextUnderline(value: string): string {
  return !value
    ? ""
    : value
        .normalize("NFD") // separa os acentos das letras
        .replace(/[\u0300-\u036f]/g, "") // remove os acentos
        .replace(/\s+/g, "_") // substitui espaços (múltiplos inclusive) por underscore
        .replace(/[^\w]/g, "") // remove qualquer caractere que não seja letra, número ou underscore
        .toUpperCase(); // deixa tudo em maiúsculo
}