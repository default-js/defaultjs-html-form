export const HTML_TAG_PREFIX = "d-";
export const TRIGGER_TIMEOUT = 100;
export const EVENTHANDLE_TIMEOUT = 200;

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
	ListRows: HTML_TAG_PREFIX + "rows",
	ListRow: HTML_TAG_PREFIX + "row",
	ButtonAddRow: HTML_TAG_PREFIX + "add-row",
	ButtonDeleteRow: HTML_TAG_PREFIX + "delete-row",
	Container: HTML_TAG_PREFIX + "container",
	Validation: HTML_TAG_PREFIX + "validation",
	Message: HTML_TAG_PREFIX + "message",
};
export const FORMSTATES = {
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
	changeSite: "change-site",
	changeAttributeEventBuilder: (name) => {
		return "change-attribute-" + name;
	},
	changeActive: "change-active",
	changeValue: "change-value",
	changeCondition: "change-condition",
	changeValidation: "change-validation",

	//LIST EVENTS
	listRowAdd: "list-row-add",
	listRowDelete: "list-row-delete",
};

export const SPECIALVARS = {
	CURRENTVALUE : "$value",
	CURRENTLISTROW : "$item"
}

//ATTRIBUTES

export const ATTRIBUTE_NAME = "name";
export const ATTRIBUTE_STEP = "step";
export const ATTRIBUTE_USE_SUMMARY_PAGE = "use-summary-page";
export const ATTRIBUTE_REQUIRED = "required";
export const ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY = "required-on-active-only";
export const ATTRIBUTE_CONDITION = "condition";
export const ATTRIBUTE_ACTIVE = "active";
export const ATTRIBUTE_DISABLED = "disabled";
export const ATTRIBUTE_READONLY = "readonly";
export const ATTRIBUTE_NOVALUE = "no-value";
export const ATTRIBUTE_VALID = "valid";
export const ATTRIBUTE_INVALID = "invalid";
export const ATTRIBUTE_CONDITION_VALID = "condition-valid";
export const ATTRIBUTE_CONDITION_INVALID = "condition-invalid";
export const ATTRIBUTE_MAX = "max";

