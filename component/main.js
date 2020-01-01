/*global require: readonly*/
const style = require('./styles.css');
class MaskedNumber extends HTMLElement{
  constructor() {
    super();

    this._shadow = this.attachShadow({mode: 'open'});
    this._shadow.innerHTML = this._getHTML(this.getAttribute('mask'));
    this._inputs = Array.prototype.filter.call(this._shadow.childNodes, x => x.tagName === 'INPUT');
    this._inputs.forEach(x => x.oninput = function() {
      x.setCustomValidity('');
    })
  }
  get value() {
    let enteredNums = this._inputs.map(x => x.value);
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
    this._inputs.forEach(x => x.value = '');
  }
  displayError() {
    this._inputs.forEach(x => x.setCustomValidity('new error'));
  }
  _getHTML(mask = ''){
    function getStyle(){
      return `<style>${style.toString()}</style>`;
    }
    function getError() {
      return '<p class="error">Неверный номер, попробуйте еще раз</p>';
    }

    let maskArr = mask.split('');
    let htmlString = maskArr.reduce((accum, x)=>{

      function defaultElement(x){
        if(/[0-9]/.test(x)){
          return '<span class="input-like">' + x + '</span>';
        }
        else {
          return '<span class="non-input-sym">' + x + '</span>';
        }
      }

      const elemObj = {
        X: '<span class="input-like">X</span>',
        I: '<input type="text" size="1" maxlength="1" minlegth="1" pattern="[0-9]" placeholder="_">',
        '*': '<span class="input-like">●</span>',
        default: defaultElement
      };
        return x in elemObj ? accum + elemObj[x] : accum + elemObj['default'](x);
      
    }, '')
    return htmlString+getError()+getStyle();
  }
}

customElements.define('masked-input', MaskedNumber);
