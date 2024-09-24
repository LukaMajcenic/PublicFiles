(function () {
    'use strict';

    GM_addStyle(`

        #container-div {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99999;
            background: #000c;
            color: white;
            width: calc(100vw - 16px);
            height: 100px;
            display: flex;
            font-family: 'roboto', 'consolas';
            padding: 8px;
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

        #get-question {
            background: limegreen;
            border-color: limegreen;
        }

        #save-question {
            background: darkorange;
            border-color: darkorange;
        }

        #toggle-window {
            position: absolute;
            top: 8px;
            right: 8px;
            z-index: 99999;
        }

        .highlight {
            position: absolute;
            width: 100vw;
            left: 0;
            pointer-events: none;
            background: #00ff0040;
        }

    `);

    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', `
        <div id="container-div">
            <textarea type="text" id="data-input" rows="4" spellcheck="false"></textarea>
            <div class="d-flex flex-column gap-8 mx-8">
                <div class="d-flex gap-8">
                    <div>
                        <span class="title">All</span>
                        <div class="d-flex">
                            <button class="secondary-btn border-left border-right" id="clear">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                                Clear
                            </button>
                        </div>
                    </div>
                    <div>
                        <span class="title">Question</span>
                        <div class="d-flex">
                            <button class="secondary-btn border-left" id="extract-question">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>
                            </button>
                            <button class="secondary-btn border-right border-left-none" id="set-q">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z"/></svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <span class="title">Answers</span>
                        <div class="d-flex">
                            <button class="secondary-btn border-left" id="set-a-t">True</button>
                            <button class="secondary-btn border-right border-left-none" id="set-a-f">False</button>
                        </div>
                    </div>
                </div>
                <div class="d-flex">
                    <button class="secondary-btn border-left" id="get-question">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                        <b>GET</b> https://192.168.1.8/api/
                    </button>
                    <button class="secondary-btn border-right" id="save-question">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
                        <b>POST</b>
                    </button>
                </div>
            </div>
            <div id="log-div"></div>
        </div>
        <button class="secondary-btn border-left border-right" id="toggle-window">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
        </button>
        `)

    const url = 'https://192.168.1.8:81/api/';
    const dataInput = document.getElementById('data-input');
    const logDiv = document.getElementById('log-div');

    dataInput.value = JSON.stringify({
        question: "",
        answers: []
    }, null, 2);

    function addLogSuccess(text)
    {
        logDiv.insertAdjacentHTML('beforeend', `<span style="color: lime">(${logDiv.getElementsByTagName('span').length + 1}) ${text}</span>`);
        logDiv.scrollTop = logDiv.scrollHeight;
    }

    function addLogError(error)
    {
        logDiv.insertAdjacentHTML('beforeend', `<span style="color: red">(${logDiv.getElementsByTagName('span').length + 1}) line:${error.lineNumber}  ${error}</span>`);
        logDiv.scrollTop = logDiv.scrollHeight;
    }

    function extractQuestions()
    {
        let entries1 = [...new Set(Array.from(document.querySelector('iframe').contentDocument.querySelectorAll('*')).map(x => x.getAttribute('aria-label')).filter(x => x))];
        let entries2 = [...new Set(Array.from(document.querySelector('iframe').contentDocument.querySelectorAll('*')).map(x => x.innerText).filter(x => x))];

        return [...entries1, ...entries2];
    }

    document.getElementById('clear').addEventListener("click", () => {
        dataInput.value = JSON.stringify({
            question: "",
            answers: []
        }, null, 2);
        document.querySelectorAll('.highlight').forEach(e => {
            e.remove();
        })
    });

    document.getElementById('set-q').addEventListener("click", () => {
        let data = JSON.parse(dataInput.value);
        data.question = '___';

        dataInput.value = JSON.stringify(data, null, 2);
    });

    document.getElementById('set-a-t').addEventListener("click", () => {
        let data = JSON.parse(dataInput.value);
        data.answers = ['True'];

        dataInput.value = JSON.stringify(data, null, 2);
    });

    document.getElementById('set-a-f').addEventListener("click", () => {
        let data = JSON.parse(dataInput.value);
        data.answers = ['False'];

        dataInput.value = JSON.stringify(data, null, 2);
    });

    document.getElementById('extract-question').addEventListener("click", () => {

        try {
            let data = JSON.parse(dataInput.value);
            let filteredEntries = extractQuestions();

            filteredEntries = filteredEntries.filter(item =>
                item.replace(/\s/g, "").toLowerCase().includes(data.question.replace(/\s/g, "").toLowerCase())
              ).sort((a, b) => a.length - b.length)

            if(filteredEntries.length > 1) {
                addLogError('Length of filtered is ' + filteredEntries.length)
            }

            dataInput.value = JSON.stringify({
                question: filteredEntries.length != 0 ? filteredEntries[0].trim() : '?',
                answers: []
            }, null, 2);
        }
        catch(e) {
            addLogError(e);
        }
        
    });

    document.getElementById('get-question').addEventListener("click", async () => {

        try {
            let data = JSON.parse(dataInput.value);
            let queries = extractQuestions();
            queries = queries.filter(q => !q.includes('\n'))
            if(data.question) {
                queries.unshift(data.question);
            }

            let queryUrl = url + '?' + queries.map(q => 'questions=' + encodeURIComponent(q)).join('&');

            addLogSuccess('Fetching question');
            const response = await fetch(queryUrl, {
                method: "GET"
            });
        
            if(response.ok) {
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
                
                addLogSuccess('Fetched answers for "' + dataInput.value + '"')
            }
            else {

                addLogError(await response.text());
            }
        }
        catch(e) {
            addLogError(e);
        }
        
    });

    document.getElementById('save-question').addEventListener("click", async () => {

        try {
            let data = JSON.parse(dataInput.value);

            addLogSuccess('Saving question "' + data.question + '"');
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if(response.ok) {
                addLogSuccess('Saved answers for "' + data.question + '"')
            }
            else {
                addLogError(await response.text());
            }
        }
        catch(e) {
            addLogError(e);
        }
    })

    
    let toggleWindowBtn = document.getElementById('toggle-window');
    toggleWindowBtn.addEventListener('click', function() {

        let container = document.getElementById('container-div');
        
        if(container.style.display == 'none') {
            container.style.display = 'flex';
            toggleWindowBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>';
        }
        else {
            container.style.display = 'none';
            toggleWindowBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>';
        }
    });

})();