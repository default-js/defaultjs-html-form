
ready(() => {

	const form = document.querySelector("d-form");
	form.on("d-form-submit", async (event) => {
		console.log({event, data: await form.value()});
	});	
})