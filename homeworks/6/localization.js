// task 1 Quasi-tagged Templates
let currentLang = 'en'
let translations = {}

export function setLanguage(lang) {
    currentLang = lang
}
export function setTranslations(dict) {
    translations = dict
}

export function localize(strings, ...keys) {
    return strings.reduce((acc, str, i) => {
        const key = keys[i];
        if (key === undefined) {
            return acc + str
        }
        const translated = translations?.[currentLang]?.[key] ?? `[${key}]`;
        return acc + str + translated;
    }, "");
}