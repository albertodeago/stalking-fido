import { workerFunction } from './workerCode'

const worker = new Worker(URL.createObjectURL(new Blob(
    ['(' + workerFunction.toString() + ')()'], 
    { type: 'text/javascript' }
)))


let resolveInit: Function
let initPromise: Promise<void> = new Promise(resolve => resolveInit = resolve)

let predictionResolve: Function
let getPredictionPromise = () => new Promise(resolve => predictionResolve = resolve) as Promise<Array<any>>


worker.onmessage = msg => {
    console.log('Msg from Worker: ', msg.data.action)
    if (msg.data.action === 'init-complete') {
        resolveInit()
    } else if (msg.data.action === 'predictions-complete') {
        predictionResolve(msg.data.predictions)
    }
}
worker.postMessage({action: 'init'})

const init = (): Promise<void> => {
    worker.postMessage({action: 'init'})
    return initPromise
}

const imageToImageData = (img: HTMLImageElement): ImageData => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0 );

    return context.getImageData(0, 0, img.width, img.height);
}

const getPredictions = (img: HTMLImageElement): Promise<Array<any>> => {
    const imageData = imageToImageData(img)
    worker.postMessage({action: 'predictions', image: imageData})
    return getPredictionPromise()
}

export {
    init,
    getPredictions
}