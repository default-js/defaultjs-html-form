(async () => {
	await import("/browser-defaultjs-html-form.js");

	class TestFormField extends defaultjs.html.form.BaseField {
		constructor() {
			super();
		}

		#initialized = false;

		async init() {
			await super.init();
			if (!this.#initialized) {
				this.#initialized = true;
				this.publishValue("my test value");
				this.textContent = "my test value";
			}
		}
	}
	customElements.define("test-form-field", TestFormField);

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
		console.log("field", await find("test-form-field").first().value());
		console.log("container", await find("d-container").first().value());
		console.log("form", await find("d-form").first().value());
	});
})();
