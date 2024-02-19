(async () => {
	await import("/browser-defaultjs-html-form.js");

	const BaseSubmitAction = defaultjs.html.form.BaseSubmitAction;
	const SubmitActionResult = defaultjs.html.form.SubmitActionResult;

	class TestAction extends BaseSubmitAction {
		constructor() {
			super();
		}

		async execute(data = {}) {
			return new Promise((resolve) => {
				setTimeout(() => {
					console.log("action done");
					resolve(new SubmitActionResult(this, BaseSubmitAction.STATES.SUCCESS));
				}, 1000);
			});
		}
	}

	customElements.define("test-action", TestAction);

	ready(() => {
		const form = document.querySelector("d-form");
	});
})();
