
const takeScreen = (videoEl: HTMLVideoElement, canvasEl: HTMLCanvasElement) => {
    canvasEl.width = videoEl.videoWidth
    canvasEl.height = videoEl.videoHeight
    canvasEl.getContext('2d').drawImage(videoEl, 0, 0)

    const imageSource = canvasEl.toDataURL('image/webp')
    return imageSource
}

export {
    takeScreen
}