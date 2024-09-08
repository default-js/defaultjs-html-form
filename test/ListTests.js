import "../browser.js"

describe("List field tests", () => {
	it("case 1", async () => {
		
        const form = create(`<d-form>
                <d-page>
                    <d-list name="list">
                        <template>
                            <d-row>
                                <d-field name="field">
                                    <input type="text">
                                </d-field>
                            </d-row>
                        </template>
                        <d-rows></d-rows>
                    </d-list>
                </d-page>
            </d-form>`).first();

        document.body.append(form);
        await form.value({
            list:[
                {field:"value 1"},
                {field:"value 2"}
            ]
        });

        const value = await form.value();

		expect(value.list).toBeDefined();
        expect(value.list.length).toBe(2);
        expect(value.list[0].field).toBe("value 1");
        expect(value.list[1].field).toBe("value 2");

        form.remove();
	});
});