import Form from "@src/Form";
import Page from "@src/Page";
import ProgressBar from "@src/ProgressBar";
import Field from "@src/Field";
import Container from "@src/Container";
import List from "@src/List";
import Message from "@src/Message";
import Step from "@src/Step";
import Control from "@src/Control";

describe("Dom Tests", () => {
	it("document.createElement form", () => {
		const element = document.createElement(Form.NODENAME);
		expect(element instanceof Form).toBe(true);
	});

	it("document.createElement page", () => {
		const element = document.createElement(Page.NODENAME);
		expect(element instanceof Page).toBe(true);
	});

	it("document.createElement ProgressBar", () => {
		const element = document.createElement(ProgressBar.NODENAME);
		expect(element instanceof ProgressBar).toBe(true);
	});

	it("document.createElement Field", () => {
		const element = document.createElement(Field.NODENAME);
		expect(element instanceof Field).toBe(true);
	});

	it("document.createElement Container", () => {
		const element = document.createElement(Container.NODENAME);
		expect(element instanceof Container).toBe(true);
	});

	it("document.createElement List", () => {
		const element = document.createElement(List.NODENAME);
		expect(element instanceof List).toBe(true);
	});

	it("document.createElement Message", () => {
		const element = document.createElement(Message.NODENAME);
		expect(element instanceof Message).toBe(true);
	});

	it("document.createElement Step", () => {
		const element = document.createElement(Step.NODENAME);
		expect(element instanceof Step).toBe(true);
	});

	it("document.createElement Control", () => {
		const element = document.createElement(Control.NODENAME);
		expect(element instanceof Control).toBe(true);
	});
});