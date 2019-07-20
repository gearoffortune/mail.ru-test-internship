class MaskedNumber extends HTMLElement{
  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.innerHTML = getHTML(this.getAttribute('mask'));

  }
  getValue() {
    let enteredNums = Array.prototype.filter.call(this.shadow.childNodes, x => x.tagName === 'INPUT').map(x => x.value);
    let res = this.getAttribute('mask');
    if(enteredNums.some(x => x==='')){
      return null;
    }
    while (enteredNums.length > 0) {
      res = res.replace('I', enteredNums[0].toString());
      enteredNums.shift();
    }
    return res;
  }
  showError() {
    this.shadow.innerHTML += '<p class="error">Неверный номер, попробуйте еще раз</p>'
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
    return '<input type="text" size="1" maxlength="1" minlegth="1" pattern="[0-9]">'
  }
  function getStyle(){
    return `<style>

    </style>`;
  }

  let maskArr = mask.split('');
  let htmlString = maskArr.reduce((accum, x)=>{
    switch (x) {
      case "X":
        return accum + getXElem();
        break;
    case "*":
      return accum + getDotElem();
      break;
    case "I":
      return accum + getInput();
      break;
    default:
      if(/[0-9]/.test(x)){
        return accum + getNumElem(x);
      }
      else {
        return accum + getNonNumElem(x);
      }
    }
  }, '')
  return htmlString+getStyle();
}

customElements.define('masked-input', MaskedNumber);
