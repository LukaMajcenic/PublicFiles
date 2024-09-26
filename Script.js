(function () {
    'use strict';

    function shadeColor(color, percent) {

        var R = parseInt(color.substring(1, 3), 16);
        var G = parseInt(color.substring(3, 5), 16);
        var B = parseInt(color.substring(5, 7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        R = Math.round(R)
        G = Math.round(G)
        B = Math.round(B)

        var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
        var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
        var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

        return "#" + RR + GG + BB;
    }

    const PROD_URL = 'https://192.168.1.8:81/api';
    const TEST_URL = 'https://localhost:44334/api';
    const COLOR_OF_GET = "#1e90ff"; //dodgerblue
    const COLOR_OF_POST = "#32cd32"; //limegreen
    const COLOR_OF_PUT = "#ff8c00"; //darkorange
    const ICON_TRASH = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>';
    const ICON_LETTER_A = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path id="auto-mode-icon-path" fill="#ff0000" d="M221.5 51.7C216.6 39.8 204.9 32 192 32s-24.6 7.8-29.5 19.7l-120 288-40 96c-6.8 16.3 .9 35 17.2 41.8s35-.9 41.8-17.2L93.3 384l197.3 0 31.8 76.3c6.8 16.3 25.5 24 41.8 17.2s24-25.5 17.2-41.8l-40-96-120-288zM264 320l-144 0 72-172.8L264 320z"/></svg>';
    const ICON_CODE = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>';
    const ICON_UPLOAD = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>';
    const ICON_DOWNLOAD = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>';
    const ICON_EYE_SEE = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>';
    const ICON_EYE_HIDE = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>';
    const ICON_WINDOW_MAXIMIZE = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM96 96l320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L96 160c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>';
    const ICON_WINDOW_MINIMIZE = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l448 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 416z"/></svg>';
    const ICON_BUG = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M256 0c53 0 96 43 96 96l0 3.6c0 15.7-12.7 28.4-28.4 28.4l-135.1 0c-15.7 0-28.4-12.7-28.4-28.4l0-3.6c0-53 43-96 96-96zM41.4 105.4c12.5-12.5 32.8-12.5 45.3 0l64 64c.7 .7 1.3 1.4 1.9 2.1c14.2-7.3 30.4-11.4 47.5-11.4l112 0c17.1 0 33.2 4.1 47.5 11.4c.6-.7 1.2-1.4 1.9-2.1l64-64c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-64 64c-.7 .7-1.4 1.3-2.1 1.9c6.2 12 10.1 25.3 11.1 39.5l64.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c0 24.6-5.5 47.8-15.4 68.6c2.2 1.3 4.2 2.9 6 4.8l64 64c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-63.1-63.1c-24.5 21.8-55.8 36.2-90.3 39.6L272 240c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 239.2c-34.5-3.4-65.8-17.8-90.3-39.6L86.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l64-64c1.9-1.9 3.9-3.4 6-4.8C101.5 367.8 96 344.6 96 320l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64.3 0c1.1-14.1 5-27.5 11.1-39.5c-.7-.6-1.4-1.2-2.1-1.9l-64-64c-12.5-12.5-12.5-32.8 0-45.3z"/></svg>';
    const ICON_BUG_SLASH = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L477.4 348.9c1.7-9.4 2.6-19 2.6-28.9l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64.3 0c-1.1-14.1-5-27.5-11.1-39.5c.7-.6 1.4-1.2 2.1-1.9l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-.7 .7-1.3 1.4-1.9 2.1C409.2 164.1 393.1 160 376 160l-112 0c-8.3 0-16.3 1-24 2.8L38.8 5.1zM320 0c-53 0-96 43-96 96l0 3.6c0 15.7 12.7 28.4 28.4 28.4l135.1 0c15.7 0 28.4-12.7 28.4-28.4l0-3.6c0-53-43-96-96-96zM160.3 256L96 256c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c0 24.6 5.5 47.8 15.4 68.6c-2.2 1.3-4.2 2.9-6 4.8l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l63.1-63.1c24.5 21.8 55.8 36.2 90.3 39.6l0-143.7L166.7 227.3c-3.4 9-5.6 18.7-6.4 28.7zM336 479.2c36.6-3.6 69.7-19.6 94.8-43.8L336 360.7l0 118.5z"/></svg>';
    const ICON_KEYBOARD = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M64 112c-8.8 0-16 7.2-16 16l0 256c0 8.8 7.2 16 16 16l448 0c8.8 0 16-7.2 16-16l0-256c0-8.8-7.2-16-16-16L64 112zM0 128C0 92.7 28.7 64 64 64l448 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM176 320l224 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16l0-16c0-8.8 7.2-16 16-16zm-72-72c0-8.8 7.2-16 16-16l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16zm16-96l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16zm16-96l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16zm16-96l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16zm16-96l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16zm16-96l16 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-16c0-8.8 7.2-16 16-16z"/></svg>';

    let url = PROD_URL;

    GM_addStyle(`

        #container-div {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99999;
            background: #000c;
            color: white;
            width: calc(100vw - 16px);
            display: flex;
            font-family: 'roboto', 'consolas';
            padding: 8px;
        }

        .height-100 {
            height: 100px;
        }

        .height-150 {
            height: 150px;
        }

        #data-input {
            width: 50vw;
            border-radius: 4px;
        }

        #log-div {
            display: flex;
            flex-direction: column;
            overflow-y: overlay;
            flex: 1;
            align-items: start;
            background: #0006;
            padding: 8px;
        }

        #log-div::-webkit-scrollbar {
            display: none;
        }

        .secondary-btn {
            border: 1px solid gray;
            font-size: 16px;
            font-family: 'roboto', 'consolas';
            padding: 4px;
            color: white;
            background: dimgray;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            height: 28px;
        }

        .secondary-btn:hover {
            filter: brightness(105%);
        }

        .secondary-btn:active {
            filter: brightness(115%);
        }

        .title {
            font-size: 12px;
            color: darkgray;
            display: flex;
            justify-content: center;
            margin-bottom: 2px;
        }

        .title .dash {
            flex: 1;
            border-top: 1px dotted darkgray;
        }

        .title .dash.dash-left {
            border-left: 1px dotted darkgray;
            margin: 8px 2px 2px 8px;
        }

        .title .dash.dash-right {
            border-right: 1px dotted darkgray;
            margin: 8px 8px 2px 2px;
        }

        .d-flex {
            display: flex;
        }

        .mx-8 {
            margin-left: 8px;
            margin-right: 8px;
        }

        .gap-8 {
            gap: 8px;
        }

        .gap-12 {
            gap: 12px;
        }

        .flex-column {
            flex-direction: column;
        }

        .border-left {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }

        .border-right {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }

        .border-left-none {
            border-left: 0;
        }

        #btn-get-question, #btn-get-info {
            background: ${COLOR_OF_GET};
            border-color: ${COLOR_OF_GET};
        }

        #btn-post-question {
            background: ${COLOR_OF_POST};
            border-color: ${COLOR_OF_POST};
        }

        
        #btn-put-question {
            background: ${COLOR_OF_PUT};
            border-color: ${COLOR_OF_PUT};
        }

        #sticky-buttons {
            position: absolute;
            top: 8px;
            right: 8px;
            z-index: 99999;
            gap: 4px;
        }

        .highlight {
            position: absolute;
            width: 100vw;
            left: 0;
            pointer-events: none;
            background: #00ff0040;
        }

        #btn-auto-mode {
            margin-right: 2px;
        }

        #btn-auto-mode.pressed {
            box-shadow: inset 0px 0px 5px 1px dimgray;
            background: transparent;
        }

        #modal-wrapper {
            position: absolute;
            left: 0;
            top: 0;
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #modal {
            height: 80vh;
            width: 80vw;
            background: white;
            border-radius: 8px;
            padding: 8px;
            border: 2px solid lightgray;
            z-index: 99999;
        }

        #modal button {
            display: inline-block;
            margin-bottom: 4px;
        }

        .d-none {
            display: none !important;
        }
    `);

    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', `
        <div id="container-div" class="height-100">
            <textarea type="text" id="data-input" rows="4" spellcheck="false"></textarea>
            <div class="d-flex flex-column gap-8 mx-8">
                <div class="d-flex gap-8">
                    <div>
                        <div class="title">
                            <div class="dash dash-left"></div>
                            All
                            <div class="dash dash-right"></div>
                        </div>
                        <div class="d-flex">
                            <button class="secondary-btn border-left border-right" id="btn-clear">
                                ${ICON_TRASH}
                                Clear
                            </button>
                        </div>
                    </div>
                    <div>
                        <div class="title">
                            <div class="dash dash-left"></div>
                            Question
                            <div class="dash dash-right"></div>
                        </div>
                        <div class="d-flex">
                            <button class="secondary-btn border-left border-right" id="btn-auto-mode">
                                <input type="checkbox" id="auto-mode-chechkbox" hidden />
                                ${ICON_LETTER_A}
                            </button>
                            <button class="secondary-btn border-left" id="btn-extract-question">
                                ${ICON_CODE}
                            </button>
                            <button class="secondary-btn border-left-none" id="btn-set-q-__">
                                "__"
                            </button>
                            <button class="secondary-btn border-right border-left-none" id="btn-set-q-which">
                                "Which..."
                            </button>
                        </div>
                    </div>
                    <div>
                        <div class="title">
                            <div class="dash dash-left"></div>
                            Answer
                            <div class="dash dash-right"></div>
                        </div>
                        <div class="d-flex">
                            <button class="secondary-btn border-left" id="btn-set-a-true">"True"</button>
                            <button class="secondary-btn border-right border-left-none" id="btn-set-a-false">"False"</button>
                        </div>
                    </div>
                </div>
                <div class="d-flex gap-8">
                    <div>
                        <div class="title">
                            <div class="dash dash-left"></div>
                            Questions
                            <div class="dash dash-right"></div>
                            </div>
                        <div class="d-flex">
                            <button class="secondary-btn border-left" id="btn-get-question">
                                ${ICON_UPLOAD}
                                <b>GET</b>
                                <span id="url-text">${url}<span>
                            </button>
                            <button class="secondary-btn" id="btn-post-question">
                                ${ICON_DOWNLOAD}
                                <b>POST</b>
                            </button>
                            <button class="secondary-btn border-right" id="btn-put-question">
                                ${ICON_DOWNLOAD}
                                <b>PUT</b>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="d-flex gap-8 d-none" id="settings-container">
                    <div>
                        <div class="title">
                            <div class="dash dash-left"></div>
                            Url
                            <div class="dash dash-right"></div>
                        </div>
                        <div class="d-flex">
                            <button class="secondary-btn border-left" id="btn-set-url-prod">PROD</button>
                            <button class="secondary-btn border-left-none" id="btn-set-url-test">TEST</button>
                            <button class="secondary-btn border-right border-left-none" id="btn-set-url-custom">${ICON_KEYBOARD}</button>
                        </div>
                    </div>
                    <div>
                        <div class="title">
                            <div class="dash dash-left"></div>
                            Simulate log
                            <div class="dash dash-right"></div>
                        </div>
                        <div class="d-flex">
                            <button class="secondary-btn border-left" id="btn-simulate-log-success">Success</button>
                            <button class="secondary-btn border-left-none" id="btn-simulate-log-info">Info</button>
                            <button class="secondary-btn border-right border-left-none" id="btn-simulate-log-error">Error</button>
                        </div>
                    </div>
                    <div>
                        <div class="title">
                            <div class="dash dash-left"></div>
                                Info
                            <div class="dash dash-right"></div>
                        </div>
                        <div class="d-flex">
                            <button class="secondary-btn border-left border-right" id="btn-get-info">
                                ${ICON_UPLOAD}
                                <b>GET</b>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="log-div"></div>
        </div>
        <div class="d-flex" id="sticky-buttons">
            <button class="secondary-btn border-left border-right" id="btn-toggle-modal">
                ${ICON_WINDOW_MAXIMIZE}
            </button>
            <button class="secondary-btn border-left border-right" id="btn-toggle-settings">
                ${ICON_BUG}
            </button>
            <button class="secondary-btn border-left border-right" id="btn-toggle-window">
                ${ICON_EYE_SEE}
            </button>
        </div>
        <div id="modal-wrapper" class="d-none">
            <div id="modal"></div>
        </div>
        `)

    const dataInput = document.getElementById('data-input');
    const logDiv = document.getElementById('log-div');

    dataInput.value = JSON.stringify({
        question: "",
        answers: []
    }, null, 2);

    function line() {
        var e = new Error();
        if (!e.stack) try {
            // IE requires the Error to actually be throw or else the Error's 'stack'
            // property is undefined.
            throw e;
        } catch (e) {
            if (!e.stack) {
                return 0; // IE < 10, likely
            }
        }
        var stack = e.stack.toString().split(/\r\n|\n/);
        // We want our caller's frame. It's index into |stack| depends on the
        // browser and browser version, so we need to search for the second frame:
        var frameRE = /:(\d+:\d+)[^\d]*$/;
        do {
            var frame = stack.shift();
        } while (!frameRE.exec(frame) && stack.length);

        let result = frameRE.exec(stack.shift())[1].split(':');

        return (result[0] - 1) + ":" + result[1];
    }

    function generateLogText(log, line) {
        var d = new Date();

        return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")} ${log} <${line}>`;
    }

    function addLogInfo(log, line) {
        let text = generateLogText(log, line);

        console.info(text);
        logDiv.insertAdjacentHTML('beforeend', `<span style="color: yellow">${text}</span>`);
        logDiv.scrollTop = logDiv.scrollHeight;
    }

    function addLogSuccess(log, line) {
        let text = generateLogText(log, line);

        console.log(text);
        logDiv.insertAdjacentHTML('beforeend', `<span style="color: lime">${text}</span>`);
        logDiv.scrollTop = logDiv.scrollHeight;
    }

    function addLogError(log, line) {
        let text = generateLogText(log, line);

        console.error(text);
        logDiv.insertAdjacentHTML('beforeend', `<span style="color: red">${text}</span>`);
        logDiv.scrollTop = logDiv.scrollHeight;
    }

    function extractQuestions() {
        let entries1 = [...new Set(Array.from(document.querySelector('iframe').contentDocument.querySelectorAll('*')).map(x => x.getAttribute('aria-label')).filter(x => x))];
        let entries2 = [...new Set(Array.from(document.querySelector('iframe').contentDocument.querySelectorAll('*')).map(x => x.innerText).filter(x => x))];

        return [...entries1, ...entries2];
    }

    document.getElementById('btn-auto-mode').addEventListener("click", () => {
        let chechkbox = document.getElementById('auto-mode-chechkbox');

        chechkbox.checked = !chechkbox.checked;

        document.getElementById('auto-mode-icon-path').setAttribute("fill", chechkbox.checked ? "#00ff00" : "#ff0000");
        if (chechkbox.checked) {
            document.getElementById('btn-auto-mode').classList.add('pressed')
        }
        else {
            document.getElementById('btn-auto-mode').classList.remove('pressed')
        }
    });

    document.getElementById('btn-clear').addEventListener("click", () => {
        dataInput.value = JSON.stringify({
            question: "",
            answers: []
        }, null, 2);
        document.querySelectorAll('.highlight').forEach(e => {
            e.remove();
        })
    });

    function setQuestion(text) {
        let data = JSON.parse(dataInput.value);
        data.question = text;

        dataInput.value = JSON.stringify(data, null, 2);
    }

    Array.from(document.getElementsByClassName('btn-set-q')).forEach(function (element) {
        console.log("1:" + element);
        element.addEventListener("click", () => {
            console.log("2:" + element);
            setQuestion(element.getAttribute("q-value"));

            if (document.getElementById('auto-mode-chechkbox').checked) {
                document.getElementById('btn-extract-question').click();
            }
        })
    });

    document.getElementById('btn-set-q-__').addEventListener("click", () => {
        setQuestion('___');

        if (document.getElementById('auto-mode-chechkbox').checked) {
            document.getElementById('btn-extract-question').click();
        }
    });

    document.getElementById('btn-set-q-which').addEventListener("click", () => {
        setQuestion('which of the following');

        if (document.getElementById('auto-mode-chechkbox').checked) {
            document.getElementById('btn-extract-question').click();
        }
    });

    document.getElementById('btn-set-a-true').addEventListener("click", () => {
        let data = JSON.parse(dataInput.value);
        data.answers = ['True'];

        dataInput.value = JSON.stringify(data, null, 2);
    });

    document.getElementById('btn-set-a-false').addEventListener("click", () => {
        let data = JSON.parse(dataInput.value);
        data.answers = ['False'];

        dataInput.value = JSON.stringify(data, null, 2);
    });

    document.getElementById('btn-extract-question').addEventListener("click", () => {

        try {
            let data = JSON.parse(dataInput.value);
            let filteredEntries = extractQuestions();

            filteredEntries = filteredEntries.filter(item =>
                item.replace(/\s/g, "").toLowerCase().includes(data.question.replace(/\s/g, "").toLowerCase())
            ).sort((a, b) => a.length - b.length)

            if (filteredEntries.length > 1) {
                addLogError('Length of filtered is ' + filteredEntries.length, line())

                if (filteredEntries.length != 0) {
                    dataInput.value = JSON.stringify({
                        question: filteredEntries[0].trim(),
                        answers: []
                    }, null, 2);
                }

                document.getElementById('modal').innerHTML = "";

                filteredEntries.forEach(text => {
                    document.getElementById('modal').insertAdjacentHTML('beforeend', `
                        <button class="set-q secondary-btn border-left border-right" q-value="${text}">
                        "${text}"
                        </button>
                        `)
                })

                Array.from(document.getElementsByClassName('btn-set-q')).forEach(function (element) {
                    element.addEventListener("click", () => {
                        setQuestion(element.getAttribute("q-value"));

                        if (document.getElementById('auto-mode-chechkbox').checked) {
                            document.getElementById('btn-extract-question').click();
                        }
                        hideModal();
                    })
                });

                showModal();
            }
            else {
                addLogError("Failed to extract question", line());
            }

        }
        catch (e) {
            addLogError(e, line());
        }

    });

    document.getElementById('btn-get-question').addEventListener("click", async () => {

        try {
            //TODO: Accept only one question
            let data = JSON.parse(dataInput.value);
            let queries = extractQuestions();
            queries = queries.filter(q => !q.includes('\n'))
            if (data.question) {
                queries.unshift(data.question);
            }

            let queryUrl = url + '?' + queries.map(q => 'questions=' + encodeURIComponent(q)).join('&');

            addLogInfo('Fetching question', line());
            const response = await fetch(queryUrl, {
                method: "GET"
            });

            if (response.ok) {
                const parsedObject = JSON.parse(await response.text()); // Parsing the JSON string
                const prettyJsonString = JSON.stringify(parsedObject, null, 2);
                dataInput.value = prettyJsonString;

                let iframeElements = Array.from(document.querySelector('iframe').contentDocument.querySelectorAll('*'));

                document.querySelectorAll('.highlight').forEach(e => {
                    e.remove();
                })

                parsedObject.answers.forEach(ans => {
                    let answerElements = iframeElements.filter(e => e.getAttribute('aria-label')?.replace(/\s/g, "")?.toLowerCase()?.includes(ans.replace(/\s/g, "").toLowerCase()))

                    answerElements.forEach(e => {
                        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', `
                            <div class="highlight" style="top: ${e.getBoundingClientRect().top + window.scrollY}px; height: ${e.clientHeight}px">
                            </div>
                        `)
                    });
                })

                addLogSuccess('Fetched answers for "' + dataInput.value + '"', line())
            }
            else {

                addLogError(await response.text(), line());
            }
        }
        catch (e) {
            addLogError(e, line());
        }

    });

    document.getElementById('btn-post-question').addEventListener("click", async () => {

        try {
            let data = JSON.parse(dataInput.value);

            addLogInfo('Saving question "' + data.question + '"', line());
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                addLogSuccess('Saved answers for "' + data.question + '"', line())
            }
            else {
                addLogError(await response.text(), line());
            }
        }
        catch (e) {
            addLogError(e, line());
        }
    })

    document.getElementById('btn-put-question').addEventListener("click", async () => {

        try {
            if (confirm("Update question?") == true) {

                let data = JSON.parse(dataInput.value);

                addLogInfo('Updating question "' + data.question + '"', line());
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    addLogSuccess('Updated answers for "' + data.question + '"', line())
                }
                else {
                    addLogError(await response.text(), line());
                }
            }
        }
        catch (e) {
            addLogError(e, line());
        }
    })


    document.getElementById('btn-get-info').addEventListener("click", async () => {

        try {
            addLogInfo('Fetching status', line());
            const response1 = await fetch(url + "/status", {
                method: "GET"
            });

            if (response1.ok) {

                addLogSuccess(`Status: ${response1.status}`, line())

                addLogInfo('Fetching statistics', line());
                const response2 = await fetch(url + "/statistics", {
                    method: "GET"
                });

                if (response2.ok) {
                    const parsedObject = JSON.parse(await response2.text());
                    parsedObject.forEach(value => {
                        addLogSuccess(value, line())
                    });
                }
            }
            else {

                addLogError(`Status: ${response1.status}`, line());
            }
        }
        catch (e) {
            addLogError(e, line());
        }

    });

    let toggleWindowBtn = document.getElementById('btn-toggle-window');
    toggleWindowBtn.addEventListener('click', function () {

        let container = document.getElementById('container-div');

        if (container.style.display == 'none') {
            container.style.display = 'flex';
            toggleWindowBtn.innerHTML = ICON_EYE_SEE
        }
        else {
            container.style.display = 'none';
            toggleWindowBtn.innerHTML = ICON_EYE_HIDE;
        }
    });

    let toggleSettingsBtn = document.getElementById('btn-toggle-settings');
    toggleSettingsBtn.addEventListener('click', function () {

        let mainContainer = document.getElementById('container-div');
        let settingsContainer = document.getElementById('settings-container');

        if (settingsContainer.classList.contains("d-none")) {
            toggleSettingsBtn.innerHTML = ICON_BUG_SLASH;
            settingsContainer.classList.remove("d-none");
            mainContainer.classList.remove('height-100');
            mainContainer.classList.add('height-150');
        }
        else {
            toggleSettingsBtn.innerHTML = ICON_BUG;
            settingsContainer.classList.add("d-none");
            mainContainer.classList.remove('height-150');
            mainContainer.classList.add('height-100');
        }
    });

    function showModal() {
        if (document.getElementById('modal-wrapper').classList.contains("d-none")) {
            document.getElementById('modal-wrapper').classList.remove("d-none");
            document.getElementById('btn-toggle-modal').innerHTML = ICON_WINDOW_MINIMIZE;
        }
    }

    function hideModal() {
        if (!document.getElementById('modal-wrapper').classList.contains("d-none")) {
            document.getElementById('modal-wrapper').classList.add("d-none");
            document.getElementById('btn-toggle-modal').innerHTML = ICON_WINDOW_MAXIMIZE;
        }
    }

    document.getElementById('btn-toggle-modal').addEventListener('click', function () {

        if (document.getElementById('modal-wrapper').classList.contains("d-none")) {
            showModal();
        }
        else {
            hideModal();
        }
    });

    document.getElementById('btn-simulate-log-success').addEventListener('click', function () {

        addLogSuccess('LogSuccess simulation', line());
    });

    document.getElementById('btn-simulate-log-info').addEventListener('click', function () {

        addLogInfo('LogInfo simulation', line());
    });

    document.getElementById('btn-simulate-log-error').addEventListener('click', function () {

        addLogError('LogError simulation', line());
    });

    document.getElementById('btn-set-url-prod').addEventListener('click', function () {

        url = PROD_URL;
        document.getElementById('url-text').textContent = url;
    });

    document.getElementById('btn-set-url-test').addEventListener('click', function () {

        url = TEST_URL;
        document.getElementById('url-text').textContent = url;
    });

    document.getElementById('btn-set-url-custom').addEventListener('click', function () {

        let customUrl = prompt("Enter custom url");
        if (customUrl != null) {
            url = customUrl;
            document.getElementById('url-text').textContent = url;
        }
    });

})();