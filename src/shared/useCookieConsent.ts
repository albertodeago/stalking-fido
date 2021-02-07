import { ref } from 'vue'

const COOKIE_KEY = "accepted_cookie"
const ACCETPED_VALUE = "TRUE"

// accepted state
const isCookiesAccepted = ref<boolean>(false)

// initial check
if (localStorage.getItem(COOKIE_KEY) === ACCETPED_VALUE) {
    isCookiesAccepted.value = true
}

// Accept cookies
const acceptCookies = () => {
    isCookiesAccepted.value = true
    localStorage.setItem(COOKIE_KEY, ACCETPED_VALUE)
}

export {
    isCookiesAccepted,
    acceptCookies
}
