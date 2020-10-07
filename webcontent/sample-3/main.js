
ready(() => {

	const form = document.querySelector("d-form");
	form.on("d-form-submit", (event) => {
		console.log({event, data: form.data});
	});	
})