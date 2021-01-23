# StalkingFido

A web application made to *stalk* the dogs in my neighborhood.  
Made with Vite + Vue3 + Tailwind 2 + TensorflowJs  
This is a toy project.

You can use it [here](https://albertodeago.github.io/stalking-fido/)

**Privacy disclaimer: ALL the pictures are taken and remain in the client. No data is sent anywhere**  
(in fact a nice addition would be transform this into a PWA and add offline support)

### What's the purpose
The main purpose of the app is to use new tools and to learn stuff.

The application will request camera access, then it will start to take pictures (every some seconds) and it will analyze them.
If it finds a dog it will save the image (in the app, not in the device gallery) and it will start to take pictures more frequently. When no dogs are detected the picture rate will slow down again.

All the saved images will be available for download under the video (in the app interface).

To make the app more responsive all the Tensorflow stuff (model loading, image detection) are done in a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). The first version of the app was not using Workers and I have to say that the difference is *huge*, especially in the responsiveness of the initial loading time.


### How it's done
The tech stack is composed by:
- [Vite](https://vitejs.dev/)
- [Vue3](https://v3.vuejs.org/)
- [Tailwind2](https://tailwindcss.com/)
- [TensorflowJs](https://www.tensorflow.org/js/) to recognize dog in pictures
    - Using the [cocoSsd model](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)
- Automatic deploy made by using github-action + github-pages
- [Blob](https://github.com/g-harel/blobs) to create the random "dog patches" as background

### Special thanks
This was possible by using amazing stuff made by other devs (in addition to those mentioned above):
- [this](https://codepen.io/mgoebs52/details/ONjwOa) for the tail wagging dog animation (used as loader)

### Getting started
Install dependencies
```sh
npm install
```

Run dev server (in https otherwise the camera won't work)
```sh
npm run dev-https
```

Build for production
```sh
npm run build
```
