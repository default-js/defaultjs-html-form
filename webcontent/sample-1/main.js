function loadData() {

	const form = document.querySelector("d-form");
	form.data = {
		"loginname": "user",
		"password": "test",
		"password_check": "test",
		"displayname": "test",
		"avatar": null,
		"name": "test",
		"familyname": "test",
		"age": 20,
		"social": [
			{
				"socaltype": "facebook",
				"socialid": "test"
			}
		]
	};
}