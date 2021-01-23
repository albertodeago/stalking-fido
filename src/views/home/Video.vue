<template>
    <div class="relative" ref="container"
        :style="{padding: '10px'}"
    >

        <transition-group name="fade" mode="out-in">
            <!-- LOADER -->
            <Loader v-if="isLoading" key="loader" />

            <!-- VIDEO INTERFACE -->
            <div v-else key="record-view">
                <video :width="screenWidth" ref="video" autoplay
                    class="rounded-xl shadow-lg"
                ></video>
                <!-- <video ref="video" autoplay></video> -->
                <canvas ref="canvas" class="hidden"></canvas>
                <!-- screenshot image -->
                <img ref="screenImg" class="hidden">

                <!-- BUTTONS -->
                <div class="flex">
                    <button class="transition-all mx-auto my-4 w-20 h-20 flex items-center justify-center
                        font-bold text-2xl bg-yellow-900 text-yellow-200 rounded-full"
                        @click="() => isStreamPlaying ? pause() : play()"
                        key="button"
                    >
                        {{ isStreamPlaying ? 'Pause' : 'Play' }}
                    </button>
                </div>

                <!-- IMAGE LIST -->
                <div class="flex flex-wrap">
                    <div class="image-wrapper w-1/2 p-1" v-for="(image, i) in images" :key="i">
                        <span class="relative list-image transform origin-center z-0 shadow-md"
                            :class="{
                                'opened': selectedImage === image
                            }"
                        >
                            <img :src="image.src"
                                class="rounded-xl"
                                @click="selectedImage = selectedImage === image ? null : image"
                            >
                            <span class="flex bg-yellow-900 h-12 pt-6 pb-3 -mt-3 items-center">
                                <span @click="downloadImage(image)">
                                    <svg class="w-6 ml-2 stroke-current text-yellow-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </span>
                                <span @click="deleteImage(i)">
                                    <svg class="w-6 ml-2 stroke-current text-yellow-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

        </transition-group>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { appState, screen } from '/@/shared'
import Loader from "./Loader.vue"
import { getFirstVideoInputDevice, getVideoPermissions } from './device'
import { takeScreen } from './media'
// import { init, getPredictions } from './ml'
import { init, getPredictions } from './tfWorker'

export default defineComponent({
    name: 'Video',

    components: {
        Loader
    },

    async setup() {
        const toast = useToast()
        const container = ref(null)
        const video = ref(null)
        const canvas = ref(null)
        const screenImg = ref(null)
        const images = ref([])
        const isLoading = ref(true)
        const isStreamPlaying = ref(false)
        let intervalId = null
        const selectedImage = ref(null)

        onMounted(() => {
            container.value.style.minHeight = `${screen.height}px`
        })

        // Get device
        const selectedVideoInputDevice = await getFirstVideoInputDevice()

        const play = async () => {
            if (isStreamPlaying.value) {
                video.value.play()
                return
            }
            if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
                await startStream()
                startStalking(normalTime)
            }
        }
        const pause = () => {
            video.value.pause()
            isStreamPlaying.value = false
            stopStalking()
        }

        // Transform user inputs in ms
        const normalTime = appState.checkInterval * 1000
        const stalkingTime = appState.stalkingInterval * 1000

        const startStalking = (time) => {
            console.log("Start stalking")
            intervalId = setTimeout(async () => {
                const src = takeScreen(video.value, canvas.value)
                screenImg.value.src = src

                setTimeout(() => {}, 100)

                const predictions = await getPredictions(screenImg.value)
                const isThereADog = predictions => predictions.find(p => p.class === appState.target && (p.score * 100) > 50)
                const predictionsClasses = predictions.map(p => (p.score * 100 > 50) ? p.class : undefined).filter(Boolean)

                const toastMsg = predictionsClasses.length 
                    ? `Items detected: ${predictionsClasses.join(', ')}`
                    : 'Nothing detected'
                toast(toastMsg, {
                    timeout: isThereADog ? stalkingTime : normalTime,
                    draggable: true,
                    hideProgressBar: true,
                    icon: false
                })

                if (isThereADog(predictions)) {
                    const alertWithSound = (txt) => {
                        var msg = new SpeechSynthesisUtterance();
                        msg.text = txt;
                        msg.lang = 'it';
                        window.speechSynthesis.speak(msg);
                    }
                    if (appState.message)
                        alertWithSound(appState.message)
                    images.value.unshift({ src })
                    
                    startStalking(stalkingTime)
                } else {
                    startStalking(normalTime)
                }
            }, time)
        }
        const stopStalking = () => {
            clearInterval(intervalId)
        }
        const handleStream = stream => {
            video.value.srcObject = stream;
            isStreamPlaying.value = true;
        };
        const startStream = async () => {
            try {
                const stream = await getVideoPermissions(selectedVideoInputDevice);
                console.log('Permission granted, we can proceed')
                handleStream(stream);
            } catch(e) {
                console.error('Permission denied, abort the operation', e)
                // TODO: show a message to the user to inform of this...
            }
        }

        // Load cocoSsd model (in webworker)
        init().then(() => {
            isLoading.value = false
            play()

            const patchesEl = document.querySelectorAll('.patch')
            for (const div of patchesEl) {
                div.children[0].children[0].style.transform = 'fill 1s ease'
                div.children[0].children[0].style.fill = '#111827'
            }
        })


        const screenWidth = computed(() => screen.width - 20)

        /** 
         * Given an image source, download the image
         */
        const download = (src: string): void => {
            const a = document.createElement('a')
            a.href = src
            a.download = 'picture.jpg' // we can set the filename to download here
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }
        const downloadImage = (image: HTMLImageElement): void => {
            // console.log("download image", image)
            download(image.src)
        }
        const deleteImage = (i: number): void => {
            // console.log('delete image', i)
            selectedImage.value = null
            setTimeout(() => {
                requestAnimationFrame(() => {
                    images.value.splice(i, 1)
                })
            }, 300)
        }

        return {
            container,
            video,
            canvas,
            screenImg,
            play,
            pause,
            images,
            isLoading,
            screenWidth,
            isStreamPlaying,
            selectedImage,
            downloadImage,
            deleteImage
        }
    }
})
</script>

<style>
.Vue-Toastification__toast--default {
    background-color: #78350F !important;
    color: #FDE68A !important;
}
.Vue-Toastification__close-button {
    color: #FDE68A !important;
    opacity: 1 !important;
}

.image-wrapper > .list-image {
    transition: z-index .3s step-end, transform .3s ease;
    display: inline-block;
}
.image-wrapper:nth-child(even) > .list-image.opened {
    transform: translateX(-5.1rem) scaleX(2.1) scaleY(2.1);
    transition: z-index .3s step-start, transform .3s ease;
    z-index: 10;
}
.image-wrapper:nth-child(odd) > .list-image.opened {
    transform: translateX(5.1rem) scaleX(2.1) scaleY(2.1);
    transition: z-index .3s step-start, transform .3s ease;
    z-index: 10;
}
</style>