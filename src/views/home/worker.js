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