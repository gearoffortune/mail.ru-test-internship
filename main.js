/*global require: readonly*/
const style = require('./styles.css');
class MaskedNumber extends HTMLElement{
  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.innerHTML = getHTML(this.getAttribute('mask'));
    this.inputs = Array.prototype.filter.call(this.shadow.childNodes, x => x.tagName === 'INPUT');
    this.inputs.forEach(x => x.oninput = function() {
      x.setCustomValidity('');
    })
  }
  get value() {
    let enteredNums = this.inputs.map(x => x.value);
    let res = this.getAttribute('mask');
    if(enteredNums.some(x => x==='')||!enteredNums.every(x => /\d/.test(x))){
      return null;
    }
    while (enteredNums.length > 0) {
      res = res.replace('I', enteredNums[0].toString());
      enteredNums.shift();
    }
    return res;
  }
  resetForm() {
    this.inputs.forEach(x => x.value = '');
  }
  displayError() {
    this.inputs.forEach(x => x.setCustomValidity('new error'));
  }
}


function getHTML(mask = ''){
  function getNumElem(num){
    return `<span class="input-like">${num}</span>`;
  }
  function getNonNumElem(str){
    return `<span class="non-input-sym">${str}</span>`;
  }
  function getDotElem(){
    return '<span class="input-like">●</span>';
  }
  function getXElem(){
    return '<span class="input-like">X</span>';
  }
  function getInput(){
    return '<input type="text" size="1" maxlength="1" minlegth="1" pattern="[0-9]" placeholder="_">'
  }
  function getStyle(){
    return `<style>${style.toString()}</style>`;
  }
  function getError() {
    return '<p class="error">Неверный номер, попробуйте еще раз</p>';
  }

  let maskArr = mask.split('');
  let htmlString = maskArr.reduce((accum, x)=>{
    switch (x) {
      case "X":
        return accum + getXElem();
    case "*":
      return accum + getDotElem();
    case "I":
      return accum + getInput();
    default:
      if(/[0-9]/.test(x)){
        return accum + getNumElem(x);
      }
      else {
        return accum + getNonNumElem(x);
      }
    }
  }, '')
  return htmlString+getError()+getStyle();
}

customElements.define('masked-input', MaskedNumber);
