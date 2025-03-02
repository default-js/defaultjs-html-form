await import("/browser-defaultjs-html-form.js");
await import("./browser-defaultjs-html-renderer.js");

const { BaseSubmitAction, SubmitActionResult } = defaultjs.html.form;

class TestSubmitAction extends BaseSubmitAction {
	constructor() {
		super();
	}

	async execute(data) {
		console.log(data);
	}
}

customElements.define("test-form-action", TestSubmitAction);

const loadData = async () => {
	await find("d-form")
		.first()
		.value({
			textfield: "type-b",
			list: [{ text: "text 1" }, { text: "text 2" }],
		});
};
window.loadData = loadData;
