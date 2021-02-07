<template>
    <div class="absolute inset-0" v-if="!isCookiesAccepted">
        <div class="absolute inset-0 opacity-50 bg-black"></div>
        <div class="banner bg-yellow-900 text-white fixed bottom-0 p-2">
            <div>This website use cookies to keep track of number of access. By continuing you accept it.</div>
            <div class="flex justify-center">
                <button class="text-yellow-200 uppercase rounded-full border-yellow-200 border-2 block p-2" @click="acceptCookies()">Continue</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { acceptCookies, isCookiesAccepted } from '/@/shared/'

export default defineComponent({
    name: 'CookieBanner',
    setup() {
        return {
            isCookiesAccepted,
            acceptCookies
        }
    }
})
</script>
