(async () => {
	await import("/browser-defaultjs-html-form.js");

	const loadData = window.loadData = async () => {
		console.log("load data");
		const form = document.querySelector("d-form");

		await form.value({
			loginname: "user",
			password: "test",
			password_check: "test",
			displayname: "test",
			avatar: null,
			name: "test",
			familyname: "test",
			age: 20,
			social: [
				{
					socaltype: "facebook",
					socialid: "test 1",
				},
				{
					socaltype: "facebook",
					socialid: "test 2",
				},
			],
		});
	};

	loadData();
})();
