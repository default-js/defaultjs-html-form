(async () => {

	await import("/browser-defaultjs-html-form.js");

	const FORM = find("d-form").first();
	const data = {}

	await FORM.value(data);


	async function logData() {
		
		
	}

})();
