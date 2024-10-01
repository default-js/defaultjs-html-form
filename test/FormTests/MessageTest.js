import { UUID } from "@default-js/defaultjs-common-utils";
import "../../browser.js";

describe("Message Test -", () => {
	it("one message as child of field", async () => {
		const form = create(`<d-form>
                <d-page>
                    <d-field name="field">
                        <input type="text">                        
                        <d-message condition="$value == 'valid'">invalid</d-message>
                    </d-field>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);
		const field = form.find("d-field").first();
		const page = form.find("d-page").first();

		const fieldMessages = field.messageHandle.messages;
		expect(fieldMessages != null).toBe(true);
		expect(fieldMessages.size).toBe(1);

		const pageMessages = page.messageHandle.messages;
		expect(pageMessages != null).toBe(true);
		expect(pageMessages.size).toBe(0);

		form.remove();
	});
	
	it("three message as child of field", async () => {
		const id = `id-${UUID.uuid()}`;
		const form = create(`<d-form>
                <d-page>
                    <d-field name="field">
                        <input type="text">                        
                        <d-message condition="$value == 'valid'">invalid</d-message>
                        <d-message condition="$value == 'valid'">invalid</d-message>
                        <d-message condition="$value == 'valid'">invalid</d-message>
                    </d-field>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);
		const field = form.find("d-field").first();
		const page = form.find("d-page").first();

		const fieldMessages = field.messageHandle.messages;
		expect(fieldMessages != null).toBe(true);
		expect(fieldMessages.size).toBe(3);

		const pageMessages = page.messageHandle.messages;
		expect(pageMessages != null).toBe(true);
		expect(pageMessages.size).toBe(0);

		form.remove();
	});
	
	it("one message for field by attribute", async () => {
		const id = `id-${UUID.uuid()}`;
		const form = create(`<d-form>
                <d-page>
                    <d-field id="${id}" name="field">
                        <input type="text">
                    </d-field>
                    <d-message for="#${id}" condition="$value != 'invalid'">valid</d-message>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);

		const field = form.find("d-field").first();
		const page = form.find("d-page").first();

		const fieldMessages = field.messageHandle.messages;
		expect(fieldMessages != null).toBe(true);
		expect(fieldMessages.size).toBe(1);

		const pageMessages = page.messageHandle.messages;
		expect(pageMessages != null).toBe(true);
		expect(pageMessages.size).toBe(0);

		form.remove();
	});

	it("three message for field by attribute", async () => {
		const id = `id-${UUID.uuid()}`;
		const form = create(`<d-form>
                <d-page>
                    <d-field id="${id}" name="field">
                        <input type="text">
                    </d-field>
                    <d-message for="#${id}" condition="$value != 'invalid'">valid</d-message>
                    <d-message for="#${id}" condition="$value != 'invalid'">valid</d-message>
                    <d-message for="#${id}" condition="$value != 'invalid'">valid</d-message>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);

		const field = form.find("d-field").first();
		const page = form.find("d-page").first();

		const fieldMessages = field.messageHandle.messages;
		expect(fieldMessages != null).toBe(true);
		expect(fieldMessages.size).toBe(3);

		const pageMessages = page.messageHandle.messages;
		expect(pageMessages != null).toBe(true);
		expect(pageMessages.size).toBe(0);

		form.remove();
	});

	it("three message for field by attribute and as children", async () => {
		const id = `id-${UUID.uuid()}`;
		const form = create(`<d-form>
                <d-page>
                    <d-field id="${id}" name="field">
                        <input type="text">
                        <d-message condition="$value == 'valid'">invalid</d-message>
                        <d-message condition="$value == 'valid'">invalid</d-message>
                        <d-message condition="$value == 'valid'">invalid</d-message>
                    </d-field>
                    <d-message for="#${id}" condition="$value != 'invalid'">valid</d-message>
                    <d-message for="#${id}" condition="$value != 'invalid'">valid</d-message>
                    <d-message for="#${id}" condition="$value != 'invalid'">valid</d-message>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);

		const field = form.find("d-field").first();
		const page = form.find("d-page").first();

		const fieldMessages = field.messageHandle.messages;
		expect(fieldMessages != null).toBe(true);
		expect(fieldMessages.size).toBe(6);

		const pageMessages = page.messageHandle.messages;
		expect(pageMessages != null).toBe(true);
		expect(pageMessages.size).toBe(0);

		form.remove();
	});

	it("initial state not active", async () => {
		const id = `id-${UUID.uuid()}`;
		const form = create(`<d-form>
                <d-page>
                    <d-field id="${id}" name="field">
                        <input type="text">
                        <d-message condition="$value == 'valid'">invalid</d-message>
                    </d-field>
                    <d-message for="#${id}" condition="$value == 'valid'">invalid</d-message>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);
		const messages = form.find("d-message");

		for (let message of messages) {
			expect(message != null).toBe(true);
			expect(message.attr("active") == null).toBe(true);
		}

		form.remove();
	});


	it("state active", async () => {
		const id = `id-${UUID.uuid()}`;
		const form = create(`<d-form>
                <d-page>
                    <d-field id="${id}" name="field">
                        <input type="text">
                        <d-message condition="$value == 'valid'">invalid</d-message>
                    </d-field>
                    <d-message for="#${id}" condition="$value == 'valid'">invalid</d-message>
                </d-page>
            </d-form>`).first();

		document.body.append(form);
		await form.value(null);
		await form.value({ field: "valid" });
		const messages = form.find("d-message");

		expect(messages.map((message) => message.attr("active") != null).every((e) => e)).toBe(true);

		form.remove();
	});
	
});
