(async () => {
	await import("/browser-defaultjs-html-form.js");

	class TestAction extends defaultjs.html.form.BaseSubmitAction {
		constructor() {
			super();
		}

		async execute(data) {
			console.log("action", data);
			find("#result").first().textContent = JSON.stringify(data, null, "    ");
		}
	}

	customElements.define("test-form-action", TestAction);

	find("#debug-console").on("click", async () => {
		console.log("form", await find("d-form").first().value());
	});


	window.loadData = () => {
		find("d-form").first().value({
			fields : [
				{field:"faild"},
				{field:"valid"}
			]
		});
	}
})();
