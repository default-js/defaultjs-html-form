import NodeNames from "./NodeNames";
import Page from "./Page";

const ATTRIBUTES = ["name"];

const render = (form) => {
    
};

class Form extends HTMLElement {

    static get observedAttributes() {
		return ATTRIBUTES;
	}

    constructor(){
        super();
        this.on("change",(event) => {

            event.preventDefault();
            event.stopPropagation();
        })
    }

    connectedCallback() {
        render(this);
    }

	disconnectedCallback() {}

	adoptedCallback() {
        render(this);
    }

	attributeChangedCallback() {
		this.trigger("change");
	}

    get valid(){

    }

    get data(){

    }

    set data(data){

    }

    get pages(){
        return this.find(NodeNames.page);
    }

    get activePage(){
        return this.find(NodeNames.page + "[active]").first();
    }

    prevPage() {
        
    }

    nextPage() {        
        const pages = this.pages;        
        const page = this.activePage;
        if(page)
            page.toggleActive();

        const start = page ? pages.indexOf(page) + 1 : 0;
        for(let i = start; i < pages.length; i++){
            if(pages[i].condition)
                return pages[i].toggleActive();
        }

        
    }

    summary() {}

    submit() {}
}
window.customElements.define("defaultjs-form", Form);
export default Form;