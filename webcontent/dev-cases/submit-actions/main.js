(async () => {
	await import("/browser-defaultjs-html-form.js");
	

	class TestAction extends defaultjs.html.form.BaseSubmitAction {
		constructor(){
			super();
		}
	};

	customElements.define("test-form-action", TestAction);


	const actions = find("d-form").first().submitActions;

	console.log(actions);

})();