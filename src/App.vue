<template>
    <main class="relative">
        <div class="background absolute inset-0 bg-yellow-200 overflow-hidden" ref="background"></div>
        <img src="/dog.jpg" class="relative z-10" ref="image">
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { initScreen, screen } from '/@/shared/useScreen'

export default defineComponent({
    name: "App",
    setup() {
        const image = ref<HTMLImageElement>(null)
        const background = ref<HTMLElement>(null)

        onMounted(() => {
            initScreen()

            const patchSize = screen.width / 4

            const getPatch = (x: number, y: number): HTMLElement => {
                const svgString = blobs2.svg({
                    seed: Math.random(),
                    extraPoints: 6,
                    randomness: 10,
                    size: patchSize,
                }, {
                    fill: /*Math.random() > 0.5 ? "white" : */'#92400E',
                    stroke: 'black',
                    strokeWidth: 0,
                })
                const htmlObject = document.createElement('div')
                htmlObject.innerHTML = svgString
                htmlObject.classList.add("patch")
                htmlObject.style.position = 'absolute'
                htmlObject.style.top = `${y}px`
                htmlObject.style.left = `${x}px`

                return htmlObject
            }

            const getRandomX = (): number => Math.floor(Math.random() * screen.width) + 1 - (patchSize / 2)
            const getRandomY = (): number => Math.floor(Math.random() * screen.height) + 1 - (patchSize / 2)

            const patchesOrigins = []
            const isIntersecting = (x: number, y: number): boolean => {
                let result = false

                patchesOrigins.forEach(origin => {
                    const distSq = (origin.x - x)**2 + (origin.y - y)**2
                    const radSumSq = patchSize**2
                    if (distSq <= radSumSq) {
                        result = true
                    }
                })

                return result
            }
            for(let i = 0; i < 18; i++) {
                const x = getRandomX()
                const y = getRandomY()

                if (isIntersecting(x, y)) {
                    // nothing to do, it usually fails less than 10-20 times, so it's acceptable
                    i -= 1
                } else {
                    patchesOrigins.push({
                        x,
                        y
                    })
                    i += 1
                    background.value.appendChild(getPatch(x, y));
                }
            }


            const worker_function = () => {
                importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs')
                importScripts('https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd')

                let initPromise

                const init = () => {
                    if (!initPromise) {
                        console.log('worker: Loading TF model')
                        initPromise = cocoSsd.load()
                        initPromise.then(() => {
                            console.log('worker: Model loaded')
                        })
                    }

                    return initPromise
                }

                /**
                 * Get predictions of an image
                 * N.B init method needs to be called (at least once) before this one
                 */
                const getPredictions = async (image: HTMLImageElement) => {
                    const model = await initPromise
                    const predictions = await model.detect(image)
                    if (predictions.length === 0) {
                        console.log('Nothing interesting found')
                    }
                    predictions.forEach(prediction => console.log(`Predictions: ${prediction.class} -> ${prediction.score * 100}`))

                    return predictions
                }

                onmessage = msg => {
                    console.log('Msg from main: ', msg.data.text)
                    postMessage({text: 'hello'})

                    if (msg.data.text === 'init') {
                        init().then(() => postMessage({text: 'init-complete'}))
                    } else if (msg.data.text === 'predict') {
                        getPredictions(msg.data.image).then(prediction => postMessage({text: 'prediction-res', prediction}))
                    }
                }
            }
            const worker = new Worker(URL.createObjectURL(new Blob(
                ['(' + worker_function.toString() + ')()'], 
                { type: 'text/javascript' }
            )))
            worker.onmessage = msg => {
                console.log('Msg from Worker: ', msg.data.text)
                if (msg.data.text === 'init-complete') {
                    
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const img = image.value
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0 );
                    const imageData = context.getImageData(0, 0, img.width, img.height);

                    worker.postMessage({text: 'predict', image: imageData})
                } else if (msg.data.text === 'prediction-res') {
                    console.log("Worker gave predictions: ", msg.data.prediction)
                }
            }
            worker.postMessage({text: 'init'})

        })

        return {
            background,
            image
        }
    }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    opacity: 1;
    transition: opacity .3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>