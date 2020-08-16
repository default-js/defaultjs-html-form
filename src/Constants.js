export const HTML_TAG_PREFIX = "d-";

export const NODENAMES = {
	Form: HTML_TAG_PREFIX + "form",
	Control: HTML_TAG_PREFIX + "control",
	BackButton: HTML_TAG_PREFIX + "control-back",
	NextButton: HTML_TAG_PREFIX + "control-next",
	SummaryButton: HTML_TAG_PREFIX + "control-summary",
	SubmitButton: HTML_TAG_PREFIX + "control-submit",
	CancelButton: HTML_TAG_PREFIX + "control-cancel",
	Page: HTML_TAG_PREFIX + "page",
	Field: HTML_TAG_PREFIX + "field",
	WrapperField: HTML_TAG_PREFIX + "wrapper-field",
	List: HTML_TAG_PREFIX + "list",
	Container: HTML_TAG_PREFIX + "container",
	Validation: HTML_TAG_PREFIX + "validation",
	Message: HTML_TAG_PREFIX + "message",
};
export const STATES = {
	init: "init",
	input: "input",
	summary: "summary",
	submit: "submit",
	finished: "finished",
};

export const REQUIREDSTATES = {
	always: "always",
	onActive: "on-active",
};

export const EVENTS = {
	initialize: "initialize",
	added: "added",
	change: "change",
	changeAttributeEventBuilder: (name) => {
		return "change-attribute-" + name;
	},
	changeActive: "change-active",
	changeValue: "change-value",
	changeCondition: "change-condition",
	changeValidation: "change-validation",
};
