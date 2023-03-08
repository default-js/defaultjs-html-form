(async () => {

	await import("/browser-defaultjs-html-form.js");

	const LOG = find("#log").first();
	const FORM = find("d-form").first();
	const data = {}

	await FORM.value(data);


	window.loadData = async () => {		
		FORM.value({
			"textfield-dependend" : "textfield-dependend"
		})
	};

	window.showData = async () => {
		LOG.textContent = JSON.stringify(await FORM.value(), null, "\t");
	};
})();
