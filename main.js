const formInputTextEl = document.getElementById('search-input');
document.forms[0].addEventListener( 'submit', (e) => getDataAndShow(e) );
formInputTextEl.addEventListener('keyup', () => soloWord(formInputTextEl.value));

function soloWord(string) {
    const reg = new RegExp (/[0-9 ]/g);
    formInputTextEl.value = string.replace(reg, "");
}
function getDataAndShow(e) {
    e.preventDefault();
    const word = formInputTextEl.value.toLowerCase();
    const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    let resultTitle = document.getElementById('result-title');    
    
    fetch(URL+word)
        .then(response => {
            if (!response.ok) {
                showError(response.status);
            }
            return response.json();
        })
        .then(data => showResults(data))
        //.catch(error => showError(error));
    
    function showResults(obj) {
        initForm();
        const reducedData = obj[0];
        console.log(reducedData);
        
        location.href = '#result-title';
        resultTitle.innerText = reducedData.word;
        setTimeout( ()=> createParrafosAndContent(), 500 );
        reducedData.meanings[0].definitions.splice(2);

        function createParrafosAndContent() {
            reduceForm();    
            let iframeEl = document.querySelector('#results>iframe');
            reducedData.meanings[0].definitions.forEach( (el,i) => {
                let newP = document.createElement('p');
                newP.classList.add('results-text');
                el.example && (newP.innerText = `Defin. ${i+1}: ${el.definition} Ej.: "${el.example}"`);
                !el.example && (newP.innerText = `Defin. ${i+1}: ${el.definition}`);
                iframeEl.insertAdjacentElement("beforebegin", newP);
                
            });
            let newSpan = document.createElement('span');
            newSpan.classList.add('results-text');
            newSpan.innerText = 'Phonetic Example: '
            iframeEl.insertAdjacentElement("beforebegin", newSpan);
            iframeEl.setAttribute('src', reducedData.phonetics.filter(item => item.audio !== '')[0].audio);

            let newClose = document.createElement('span');
            newClose.classList.add('btn-cerrar');
            newClose.innerText = 'Clear';
            resultTitle.insertAdjacentElement('afterend', newClose);
            newClose.addEventListener('click', () => initForm(), {once: true});
        }
        function reduceForm() {
            const contentDiv = document.getElementById('content');
            contentDiv.setAttribute('class', 'reduced-content');
        }
    }
    function showError(mens) {
        resultTitle.innerText = mens+' - Word was not found';
    }
}
function initForm() {
    let iframeEl = document.querySelector('#results>iframe');
    let resultTitle = document.getElementById('result-title');
    const divResults = document.getElementById('results');
    const contentDiv = document.getElementById('content');

    divResults.childNodes.forEach((item, index) => {
        document.querySelector('#results p') && divResults.removeChild(document.querySelector('#results p'));
        document.querySelector('#results span') && divResults.removeChild(document.querySelector('#results span'));
    });
    contentDiv.setAttribute('id', 'content');
    resultTitle.innerText = '';
    iframeEl.setAttribute('src', '');
}