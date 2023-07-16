import "../../browser";

describe("Wrapper Field - Text Field", () => {
	it("update value by input field", async () => {
		const container = create(
			`<div>   
                <d-form>
                    <d-page>
                        <d-field name="textfield">
                            <input type="text">
                        </d-field>
                    </d-page>                
                </d-form>
            </div>
        `,
		).first();
		document.body.append(container);

		const form = container.find("d-form").first();
		const field = container.find("d-field").first();
		const input = container.find("input").first();

		const testValue = "test-value";
		input.value = testValue;

		return new Promise((r) => {
			setTimeout(async () => {
				const value = await field.value();
				expect(value).toBe(testValue);

				const data = await form.value();
				expect(data.textfield).toBe(testValue);
				container.remove();
				r();
			}, 1000);
		});
	});

	it("update value by field", async () => {
		const container = create(
			`<div>   
                <d-form>
                    <d-page>
                        <d-field name="textfield">
                            <input type="text">
                        </d-field>
                    </d-page>                
                </d-form>
            </div>
        `,
		).first();
		document.body.append(container);

		const form = container.find("d-form").first();
		const field = container.find("d-field").first();

		const testValue = "test-value";
		await field.value(testValue);

		const value = await field.value();
		expect(value).toBe(testValue);

		const data = await form.value();
		expect(data.textfield).toBe(testValue);
		container.remove();
	});
});
