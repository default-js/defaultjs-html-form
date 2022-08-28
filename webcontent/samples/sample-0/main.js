function loadData() {
	console.log("load data");
	const form = document.querySelector("d-form");
	form.value({
		input: "test",
		container: {
			input: "test",
		},
		list: [
			{
				input: "test",
			},
			{
				input: "test",
			},
			{
				input: "test",
			},
		],
	});
}