import "../../index.js";

describe("Form - custom subbmitted event", () => {
	it("case 1", async () => {
		const eventname = "custom-test-subbmitted-event";
		const form = create(`<d-form custom-submitted-event="${eventname}">
                <d-page>
                    <d-field name="field">
                        <input type="text">
                    </d-field>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value({ field: "value 1" });

		const promise = new Promise((resolve) => {
			form.on(eventname, (event) => {
                const value = event.detail;
                
				expect(value.field).toBeDefined();
				expect(value.field).toBe("value 1");

				form.remove();
                resolve();
			});
		});

		form.submit();
		await promise;
	});
});
