import "../../browser";

describe("Wrapper Field - Date Field", () => {
	it("update value by input field", async () => {
		const container = create(
			`<div>   
                <d-form>
                    <d-page>
                        <d-field name="datefield">
                            <input type="date">
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

        const date = new Date("2020-01-01");
        input.value = "2020-01-01";

        return new Promise((r) => {
            setTimeout(async () => {                
                const value = await field.value();
                expect(value.getTime()).toBe(date.getTime());

                const data = await form.value();
                expect(data.datefield.getTime()).toBe(date.getTime());
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
                        <d-field name="datefield">
                            <input type="date">
                        </d-field>
                    </d-page>                
                </d-form>
            </div>
        `,
		).first();
		document.body.append(container);

		const form = container.find("d-form").first();
		const field = container.find("d-field").first();

        const date = new Date("2020-01-01");
        await field.value(date);

        const value = await field.value();
        expect(value.getTime()).toBe(date.getTime());

        const data = await form.value();
        expect(data.datefield.getTime()).toBe(date.getTime());
        container.remove();
	});
});
