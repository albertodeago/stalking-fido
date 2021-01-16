
let initPromise

const init = () => {
    if (!initPromise) {
        console.log('Loading TF model')
        initPromise = cocoSsd.load()
        initPromise.then(() => {
            console.log('Model loaded')
        })
    }

    return initPromise
}
// console.log('Loading TF model')
// const tfModelPromise = cocoSsd.load()
// tfModelPromise.then(() => {
//     console.log('Model loaded')
//     isLoading.value = false

//     play()
// })

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

export {
    init,
    getPredictions
}