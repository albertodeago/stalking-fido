const workerFunction = () => {
    importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs')
    importScripts('https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd')

    let initPromise

    /**
     * Init the web worker, load the Tensorflow (cocossd) model
     */
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
     * Convert an image source to an ImageData (using an OffscreenCanvas)
     * @param {string} imageSrc
     * @returns {ImageData} 
     */
    const imageSrcToImageData = async imageSrc => {
        const response = await fetch(imageSrc);
        const fileBlob = await response.blob();
        const bitmap = await createImageBitmap(fileBlob);
        const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
        const context = canvas.getContext('2d');
        context.drawImage(bitmap, 0, 0);
        return context.getImageData(0, 0, bitmap.width, bitmap.height);
    }

    /**
     * Get the TF model predictions of an image
     * N.B init method needs to be called (at least once) before this one to work properly
     */
    const getPredictions = async image => {
        image = await imageSrcToImageData(image)
        const model = await initPromise
        const predictions = await model.detect(image)
        if (predictions.length === 0) {
            console.log('Nothing interesting found')
        }
        predictions.forEach(prediction => console.log(`Predictions: ${prediction.class} -> ${prediction.score * 100}`))

        return predictions
    }

    /**
     * Callback for messages received from the main thread
     */
    onmessage = msg => {
        console.log('Msg from main: ', msg.data)

        if (msg.data.action === 'init') {
            init().then(() => postMessage({action: 'init-complete'}))

        } else if (msg.data.action === 'predictions') {
            getPredictions(msg.data.image)
                .then(predictions => postMessage({action: 'predictions-complete', predictions}))
        }
    }
}

export { workerFunction }