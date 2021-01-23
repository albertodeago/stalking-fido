<template>
    <main>
        <Suspense>
            <template #default>
                <Video />
            </template>
            <template #fallback>
                <!-- LOADER -->
                <Loader />
            </template>
        </Suspense>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Video from './Video.vue'
import Loader from './Loader.vue'

export default defineComponent({
    name: "Record",

    components: {
        Video,
        Loader
    },

    setup() {
        if (!('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices)) {
            console.error("Device does not support this app")
            alert("This device does not support this app")
        }
    }
})
</script>