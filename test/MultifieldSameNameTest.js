import "../browser.js"

describe("Multiple fields same name test", () => {
	it("case 1", async () => {
		
        const form = create(`<d-form>
                <d-page>
                    <d-field name="field" condition="true">
                        <input type="text">
                    </d-field>
                    <d-field name="field" condition="false">
                        <input type="text">
                    </d-field>
                </d-page>
            </d-form>`).first();

        document.body.append(form);
        const field = form.find("d-field").first();

        await field.value("value-1");

        const value = await form.value();

		expect(value.field).toBe("value-1");
	});
    
    it("case 2", async () => {
		
        const form = create(`<d-form>
                <d-page>
                    <d-field name="field" condition="false">
                        <input type="text">
                    </d-field>
                    <d-field name="field" condition="true">
                        <input type="text">
                    </d-field>
                </d-page>
            </d-form>`).first();

        document.body.append(form);
        const field = form.find("d-field").last();

        await field.value("value-2");

        const value = await form.value();

		expect(value.field).toBe("value-2");
	});
});