interface Navigator {
    [key: string]: any;
}
const languages = {
    polish: 'pl',
    english: 'en'
};

export function detectLanguageFromNavigator() {
    const key = 'userLanguage';
    const navigator: Navigator = window.navigator;
    const detectedLanguage = navigator[key] || window.navigator.language;

    if (detectedLanguage.includes(languages.english)) {
        return languages.english;
    }

    if (detectedLanguage.includes(languages.polish)) {
        return languages.polish;
    }

    return languages.english;
}