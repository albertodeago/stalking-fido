import { reactive } from 'vue'

interface AppState {
    target: string, // object to detect
    checkInterval: number, // amount of seconds
    stalkingInterval: number, // amount of seconds
    message: string, // text to read as an alert
    language: string, // language to use to read the message
    imageList: Array<string> // array of image sources
}

const appState = reactive<AppState>({
    target: '',
    checkInterval: 0,
    stalkingInterval: 0,
    message: '',
    language: '',
    imageList: []
})

// initialize state
const initState = () => {
    const lang = navigator.language

    appState.target = 'dog',
    appState.checkInterval = 3,
    appState.stalkingInterval = 1,
    appState.message = ''
    appState.language = lang ? lang.slice(0, 2) : 'en'
    appState.imageList = []
}
initState()

export {
    appState
}