

await import("/browser-defaultjs-html-form.js");

const { BaseSubmitAction, SubmitActionResult} = defaultjs.html.form;


class TestSubmitAction extends BaseSubmitAction{
	constructor(){
		super();
	}

	async execute(data){
		console.log(this.attr("title"), data)
	}

}

customElements.define("test-submit-action", TestSubmitAction);


const form = document.querySelector("d-form");
form.on("d-form-submit", async (event) => {
	console.log({event, data: await form.value()});
});	