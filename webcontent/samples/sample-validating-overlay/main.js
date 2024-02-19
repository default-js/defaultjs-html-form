(async () => {
	await import("/browser-defaultjs-html-form.js");
	ready(() => {
		const form = document.querySelector("d-form");
		form.on("d-form-submit", async (event) => {
			const data = await form.value();
			console.log({ event, data });
			console.log(JSON.stringify(data, undefined, "  "));
		});

		form.on("d-form-state-changed", (event) => {
			console.log(event);
		});

		form.value({
			container: {
				field1: "value",
				field2: "value",
				field3: "value",
			},
		});
	});
})();
