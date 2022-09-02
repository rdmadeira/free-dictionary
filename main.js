document.forms[0].addEventListener( 'submit', (e) => getDataAndShow(e) );

const formInputTextEl = document.getElementById('search-input');
formInputTextEl.addEventListener('input', () => soloWord(formInputTextEl.value));

function soloWord(string) {
    const reg = new RegExp (/[0-9 ]/g);
    
    formInputTextEl.value = string.replace(reg, "");
}
function getDataAndShow(e) {
    e.preventDefault();
    const word = formInputTextEl.value.toLowerCase();
}