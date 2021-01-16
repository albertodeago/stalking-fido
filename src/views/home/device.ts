const getDevices = async () => await navigator.mediaDevices.enumerateDevices()


/**
 * Scan the user devices and return the first 'videoinput' one
 * Preferibly a back one
 */
const getFirstVideoInputDevice = async () => {
    const deviceList = await getDevices()
    // console.log('Complete device list: ', deviceList)
    const videoInputDevices = deviceList.filter(device => device.kind === 'videoinput')
    // console.log('Video input device list: ', videoInputDevices)
    const backVideoInputDevices = videoInputDevices.filter(device => device.label.includes('back'))
    // console.log('Back video input device list: ', videoInputDevices)
    const selectedVideoInputDevice = backVideoInputDevices.length ? backVideoInputDevices[0] : videoInputDevices[0]
    // console.log('Selected inputvideo device: ', selectedVideoInputDevice)
    
    return selectedVideoInputDevice
}


/**
 * Given a video input device, get the permission to use it
 */
const getVideoPermissions = videoInput => {
    const videoConstraints = {
        video: {
            width: {
                min: 1280,
                ideal: 1920,
                max: 2560,
            },
            height: {
                min: 720,
                ideal: 1080,
                max: 1440
            },
            facingMode: 'environment'
        },
        deviceId: {
            exact: videoInput.deviceId
        }
    }

    return navigator.mediaDevices.getUserMedia(videoConstraints)
}

export {
    getFirstVideoInputDevice,
    getVideoPermissions
}