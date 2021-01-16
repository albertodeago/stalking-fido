import { reactive, readonly } from 'vue'
import { debounce } from './helpers'

interface Screen {
    width: number,
    height: number
}

const _screen = reactive<Screen>({
    width: null,
    height: null
})
const screen = readonly(_screen)


const initScreen = ():void => {
    const debouncedListener = debounce(() => {
        // update screen properties
        console.log("resize called")
        _screen.width = window.innerWidth
        _screen.height = window.innerHeight
    }, 250)

    window.addEventListener('resize', debouncedListener as EventListenerOrEventListenerObject)

    _screen.width = window.innerWidth
    _screen.height = window.innerHeight
}

export {
    initScreen,
    screen
}