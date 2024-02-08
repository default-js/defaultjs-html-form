
ready(() => {
	const form = document.querySelector("d-form");
	form.on("d-form-submit", async (event) => {
		const data = await form.value();
		console.log({event, data});
		console.log(JSON.stringify(data, undefined, "  "));
	});	

	form.value({
		container: {
			field1: "value",
			field2: "value",
			field3: "value"
		}
	})
})