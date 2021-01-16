<template>
    <div class="svg-loader flex flex-col justify-evenly absolute inset-0">
        <h3 class="text-center font-medium text-2xl">Loading, please wait...</h3>
        <svg id="scottie" class="w-9/12 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 215 214.45"
        >
            <g class="head">
                <path d="M199.96 51.15l7.3 4.79-22.16-41.62a7.68 7.68 0 0 0 3.19-9.5 7.73 7.73 0 0 0-14.59 5l-47.43 30.73-.36-11.33-4.31 10.57-5-13.23.87 14-8.46-7.82 5.28 15.58-16.78 10.84 6 22.12.28.12c-2.64 11.7-5.11 23.23-5.11 26.12l32 18.76 15.37-25.57 13.2 13.33-5.17-13.4 10.16 10.45-6.41-15.2 14 9.86-10.45-13.08 13.51 10.14-8.87-13.51 10.54 9.56-7.48-14.64 11.74 10.11-4.7-12 11.5 7.69-7.13-12.65 10.34 6.4-8-11.87 10.91 7.8-8.79-12 12.71 9.52-8.73-12.86 10.75 8-7-13.35 10.61 9.37-6.38-13.16 9.47 8.91z"
                    style="fill: #010101; fill-rule: evenodd"
                />
                <path class="left-ear"
                    d="M121.91 54.07c-8-9.61-18.52-22.15-31-21.5-1.18 11.24 6.27 29.91 17.63 34.79a31.46 31.46 0 0 1 13.37-13.29z"
                    style="fill: #010101; fill-rule: evenodd"
                />
                <path d="M140.38 45.75a8.44 8.44 0 1 0 4.09 11.14 8.32 8.32 0 0 0-4.09-11.14z"
                    style="fill: #fff; fill-rule: evenodd"
                />
                <path d="M178.67 1.7a7.25 7.25 0 0 0-2.78 2.22 10.72 10.72 0 0 1 1.36-.67 8.3 8.3 0 0 1 10.13 3.18 7.89 7.89 0 0 0-.34-1.23 6.42 6.42 0 0 0-8.37-3.5z"
                    style="fill: #fff; fill-rule: evenodd"
                />
                <path d="M141.99 47.22a4.61 4.61 0 0 0-6.12 2.23 4.53 4.53 0 0 0 2.21 6.06 4.61 4.61 0 0 0 6.12-2.23 4.54 4.54 0 0 0-2.21-6.06z"
                    style="fill: #010101; fill-rule: evenodd"
                />
                <path class="right-ear"
                    d="M108.38 55.74c-11-3.13-27.7-.8-35.53 12.41 8.44 7.6 28 12.47 38.57 6.16a31.37 31.37 0 0 1-3.04-18.57z"
                    style="fill: #010101; fill-rule: evenodd"
                />
                <path class="eyelid"
                    fill="#010101"
                    d="M120.1 49.182l17.65-11.56 1.393 2.125-17.652 11.56z"
                />
            </g>
            <path
                d="M45.72 214.36h61.92l-2.59-8.57c-4.25-1.37-8.5-2.66-12.74-4-2.38-7.78-1.58-21-24.91-24.48 17 .29 25.42 12.17 26.5 23.62l12 3.6 2.81 9.86 3.31-.09v-1.56l.79-12.17-4.43 6.15 1-16.56-3.89 6.48.29-15.84-5.47 8.14 5.69-22.82-3.31 17.57 2.3-2.88 1.15-1.44.07 1.87.5 11.45 1.94-2.59 1.3-1.8-.07 2.23-.22 13 2.45-3.31 1.3-1.73-.07 2.16v10.22l3-3.6 1.3-1.58-.07 2-.36 6.53 4.1-.12h16.21l-1.67-7.7-5.83-3-.58-.36-.07-.65-4.39-24.34 5.76 24.55 5.76 3 .58.29.14.65 1.53 3.67h13.63l-2.66-7-11.09-3.67.29-9.5 5.62 4.6-5.16-15.78 8.35 4.54-6.76-16.18 7.78 4.75-8.71-20.09 6.41 4-6.62-18.22 8.21 4.54-9.88-17.38 6.35-19.05-12.17.65-28-21.53C85.7 115.49 48.14 158 44.78 197.22z"
                style="fill: #010101; fill-rule: evenodd"
            />
            <polygon
                points="138.93 214.07 138.96 214.07 138.96 214.06 138.93 214.07"
                style="fill: #010101; fill-rule: evenodd"
            />
            <polygon
                points="113.19 213.13 112.2 214.33 116.25 214.22 115.92 214.22 116.78 207.52 113.19 213.13"
                style="fill: #010101; fill-rule: evenodd"
            />
            <polygon
                points="146.86 102.69 99.3 86.33 95.63 97.99 144.41 115.14 146.86 102.69"
                style="fill: #8cbd44; fill-rule: evenodd"
            />
            <path
                class="tail"
                d="M45.5 199.31l.22 15S10.5 217.71 0 182.42c3.5-1.28 10.5 24.59 40.25 18.22a32 32 0 0 1 5.25-1.33z"
            />
        </svg>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Snap from "snapsvg"

export default defineComponent({
    name: "Loader",

    setup() {
        onMounted(() => {
        const svg = document.getElementById("scottie");
        const s = Snap(svg);

        var path = Snap.select(".tail");
        var head = Snap.select(".head");
        var leftEar = Snap.select(".left-ear");
        var rightEar = Snap.select(".right-ear");
        var eyelid = Snap.select(".eyelid");

        animatePath(); // start loop
        rotateHead();
        rotateRightEar();
        rotateLeftEar();
        blink();
        function blink() {
            setTimeout(function () {
            eyelid.animate(
                { d: "M120.11 49.173l17.65-11.56 12.075 18.438-17.652 11.56z" },
                150,
                mina.easeinout,
                endBlink
            );
            }, 3000);
        }
        function endBlink() {
            eyelid.animate(
            { d: "M120.1 49.182l17.65-11.56 1.393 2.125-17.652 11.56z" },
            150,
            mina.easeinout,
            blink
            );
        }

        function animatePath() {
            path.animate(
            {
                d:
                "M45.5 199.38l.22 15s-39.72-.8-23.6-40.3c3.5-1.28-7 32.75 18.13 26.63a32 32 0 0 1 5.25-1.33z",
            },
            150,
            resetPath
            );
        }

        function resetPath() {
            path.animate(
            {
                d:
                "M45.5 199.31l.22 15S10.5 217.71 0 182.42c3.5-1.28 10.5 24.59 40.25 18.22a32 32 0 0 1 5.25-1.33z",
            },
            150,
            animatePath
            );
        }

        function rotateHead() {
            setTimeout(function () {
            head.animate(
                { transform: "r2,110,100" },
                400,
                mina.easeinout,
                resetHead
            );
            }, 4000);
        }
        function resetHead() {
            setTimeout(function () {
            head.animate(
                { transform: "r0,110,100" },
                850,
                mina.easeinout,
                rotateHead
            );
            }, 5650);
        }
        function rotateRightEar() {
            setTimeout(function () {
            rightEar.animate(
                { transform: "r20,108,67" },
                300,
                mina.elastic,
                twitchStart
            );
            }, 4000);
        }
        function twitchStart() {
            setTimeout(function () {
            rightEar.animate(
                { transform: "r0,108,67" },
                200,
                mina.easein,
                twitchEnd
            );
            }, 1500);
        }
        function twitchEnd() {
            setTimeout(function () {
            rightEar.animate(
                { transform: "r25,108,67" },
                100,
                mina.elastic,
                resetRightEar
            );
            }, 50);
        }
        function resetRightEar() {
            setTimeout(function () {
            rightEar.animate(
                { transform: "r-15,108,67" },
                800,
                mina.easeout,
                rotateRightEar
            );
            }, 4000);
        }

        function rotateLeftEar() {
            setTimeout(function () {
            leftEar.animate(
                { transform: "r0,114,54" },
                150,
                mina.easein,
                resetLeftEar
            );
            }, 4000);
        }
        function resetLeftEar() {
            setTimeout(function () {
            leftEar.animate(
                { transform: "r-25,114,54" },
                850,
                mina.easeout,
                rotateLeftEar
            );
            }, 6000);
        }
        });
    },
});
</script>