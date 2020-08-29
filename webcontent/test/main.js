function loadData() {

	const form = document.querySelector("d-form");
	form.data = {
		nofiled : "nofield",
		foo: {
			bar : {
				text1: "text1",
				text2: "text2"
			},
			text1: "text1"
		},
		field1: "valid",
		field2: "load 2",
		field3: "load 3",
		field4: "load 4",
		container1: {
			field1: "message",
			field2: "load 2",
			field3: "load 3",
			field4: "load 4"
		},
		list1: [
			{
				field1: "field",
				field2: "load 2",
				field3: "load 3",
				field4: "load 4"
			},
			{
				field1: "message",
				field2: "load 2",
				field3: "load 3",
				field4: "load 4"
			},
			{
				field1: "valid",
				field2: "load 2",
				field3: "load 3",
				field4: "load 4"
			}
		]
	};
}