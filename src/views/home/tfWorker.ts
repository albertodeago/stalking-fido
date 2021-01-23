import { workerFunction } from './workerCode'

/**
 * Create a web worker 'inline'
 */
const worker = new Worker(URL.createObjectURL(new Blob(
    ['(' + workerFunction.toString() + ')()'], 
    { type: 'text/javascript' }
)))

/**
 * Helper promises to talk to the web worker via promise API
 */
let resolveInit: Function
let initPromise: Promise<void> = new Promise(resolve => resolveInit = resolve)

let predictionResolve: Function
let getPredictionPromise = () => new Promise(resolve => predictionResolve = resolve) as Promise<Array<any>>


/**
 * Callback for worker messages
 */
worker.onmessage = msg => {
    console.log('Msg from Worker: ', msg.data.action)

    if (msg.data.action === 'init-complete') {
        resolveInit()

    } else if (msg.data.action === 'predictions-complete') {
        predictionResolve(msg.data.predictions)
    }
}

/**
 * Init the web worker, this will make his load the Tensorflow model
 */
const init = (): Promise<void> => {
    worker.postMessage({action: 'init'})
    return initPromise
}

/**
 * Get predictions from the web worker 
 */
const getPredictions = (img: HTMLImageElement): Promise<Array<any>> => {
    const imageSrc = img.src
    worker.postMessage({action: 'predictions', image: imageSrc})
    return getPredictionPromise()
}

export {
    init,
    getPredictions
}