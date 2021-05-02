function loadData() {
	console.log("load data");
	const form = document.querySelector("d-form");
	form.data({
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