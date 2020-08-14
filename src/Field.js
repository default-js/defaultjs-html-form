
import Base from "./Base";

const ATTRIBUTES = ["name", "value"];
class Field extends HTMLElement {

    static get observedAttributes() {
        return ATTRIBUTES;
      }

     constructor(){

     }

     connectedCallback(){

     }

     disconnectedCallback(){

     }

     adoptedCallback(){

     }

     attributeChangedCallback(){

        this.trigger("change");
     }

     get name(){
         this.getAttribute(ATTRIBUTES[0]);
     }

     set name(name){
        this.setAttribute(ATTRIBUTES[0], name);
    }

    

}

customElements.define("defaultjs-field", Field);