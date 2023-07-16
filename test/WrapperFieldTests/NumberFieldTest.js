import "../../browser";

describe("Wrapper Field - Number Field", () => {
	it("update value by input field", async () => {
		const container = create(
			`<div>   
                <d-form>
                    <d-page>
                        <d-field name="numberfield">
                            <input type="number">
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

        const testValue = 99999;
        input.value = testValue;

        return new Promise((r) => {
            setTimeout(async () => {                
                const value = await field.value();
                expect(value).toBe(testValue);

                const data = await form.value();
                expect(data.numberfield).toBe(testValue);
                container.remove();
                r();
            }, 1000)
        });
	});

    it("update value by field", async () => {
		const container = create(
			`<div>   
                <d-form>
                    <d-page>
                        <d-field name="numberfield">
                            <input type="number">
                        </d-field>
                    </d-page>                
                </d-form>
            </div>
        `,
		).first();
		document.body.append(container);

		const form = container.find("d-form").first();
		const field = container.find("d-field").first();

        const testValue = 99999;
        await field.value(testValue);
    
        const value = await field.value();
        expect(value).toBe(testValue);

        const data = await form.value();
        expect(data.numberfield).toBe(testValue);
        container.remove();
	});
});
