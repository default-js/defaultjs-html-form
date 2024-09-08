(async () => {
	await import("/browser-defaultjs-html-form.js");
	await import("./browser-defaultjs-html-renderer.js");

	const loadData = async () => {
		await find("d-form")
			.first()
			.value({
				textfield: "type-b",
				list: [
                    {text: "text 1"},
                    {text: "text 2"}
                ],
			});
	};
	window.loadData = loadData;
})();
