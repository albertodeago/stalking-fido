import { appState } from './'

const playSound = (message?: string, lang?: string): void => {
    message = message || appState.message
    lang = lang || appState.language

    var msg = new SpeechSynthesisUtterance()
    msg.text = message
    msg.lang = lang
    window.speechSynthesis.speak(msg)
}

export {
    playSound
}