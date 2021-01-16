const workerFunction = () => {
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
    const getPredictions = async image => {
        const model = await initPromise
        const predictions = await model.detect(image)
        if (predictions.length === 0) {
            console.log('Nothing interesting found')
        }
        predictions.forEach(prediction => console.log(`Predictions: ${prediction.class} -> ${prediction.score * 100}`))

        return predictions
    }

    onmessage = msg => {
        console.log('Msg from main: ', msg.data.action)
        if (msg.data.action === 'init') {
            init().then(() => postMessage({action: 'init-complete'}))
        } else if (msg.data.action === 'predictions') {
            getPredictions(msg.data.image)
                .then(predictions => postMessage({action: 'predictions-complete', predictions}))
        }
    }
}

export { workerFunction }