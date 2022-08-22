export const HTML_TAG_PREFIX = "d-";
export const TRIGGER_TIMEOUT = 10;
export const EVENTHANDLE_TIMEOUT = 10;
export const EVENTHANDLE_INPUT_TIMEOUT = 50 * EVENTHANDLE_TIMEOUT;

export const NODENAME_FORM = `${HTML_TAG_PREFIX}form`;
export const NODENAME_SUBMIT_ACTION = `${HTML_TAG_PREFIX}submit-action`;


export const NODENAMES = {
	Form: NODENAME_FORM,
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
	ProgressBar: HTML_TAG_PREFIX + "progress-bar",
	Step: HTML_TAG_PREFIX + "step",
	SubmitAction: NODENAME_SUBMIT_ACTION,
};

export const FORMSTATE_INIT = "init";
export const FORMSTATE_VALIDATING = "validating";
export const FORMSTATE_INPUT = "input";
export const FORMSTATE_SUMMARY = "summary";
export const FORMSTATE_FINISHED = "finished";
export const FORMSTATES = {
	init: FORMSTATE_INIT,
	validating: FORMSTATE_VALIDATING,
	input: FORMSTATE_INPUT,
	summary: FORMSTATE_SUMMARY,
	finished: FORMSTATE_FINISHED,
};

export const REQUIREDSTATES = {
	always: "always",
	onActive: "on-active",
};

export const EVENT_PREFIX = HTML_TAG_PREFIX + "form-";

export const EVENT_INITIALIZE = `${EVENT_PREFIX}initialize`;
export const EVENT_INITIALIZED = `${EVENT_PREFIX}initialized`;
export const EVENT_FIELD_INITIALIZED = `${EVENT_PREFIX}field-initialized`;
export const EVENT_FIELD_REMOVED = `${EVENT_PREFIX}field-removed`;
export const EVENT_INITIALIZE_SUBMIT_ACTION = `${EVENT_INITIALIZE}submit-action`;
export const EVENT_SUBMIT = `${EVENT_PREFIX}submit`;
export const EVENT_SUBMIT_RESULTS = `${EVENT_PREFIX}submit-results`;
export const EVENT_EXECUTE_VALIDATE = `${EVENT_PREFIX}execute-validate`;
export const EVENT_CONDITION_STATE_CHANGED = `${EVENT_PREFIX}condition-state-changed`;
export const EVENT_ALL_PUBLISH_VALUE = `${EVENT_PREFIX}all-publish-value`;
export const EVENT_VALUE_CHANGED = `${EVENT_PREFIX}field-value-changed`;
export const EVENT_SITE_CHANGED = `${EVENT_PREFIX}site-changed`;
export const EVENT_FORM_STATE_CHANGED = `${EVENT_PREFIX}state-changed`;
export const EVENT_FIELD_INPUT = `${EVENT_PREFIX}field-input`;
export const EVENT_LIST_ROW_ADD = `${EVENT_PREFIX}list-row-add`;
export const EVENT_LIST_ROW_DELETE = `${EVENT_PREFIX}list-row-delete`;
export const EVENT_PROGRESSBAR_CHANGED = `${EVENT_PREFIX}progress-bar-changed`;
export const EVENT_MESSAGE_INITIALIZED = `${EVENT_PREFIX}message-initialized`;
export const EVENT_MESSAGE_REMOVED = `${EVENT_PREFIX}message-removed`;

export const EVENT_ACTIVE_STATE_CHANGED = `${EVENT_PREFIX}active-state-changed`;
export const EVENT_VALID_STATE_CHANGED = `${EVENT_PREFIX}valid-state-changed`;
export const EVENT_EDITABLE_STATE_CHANGED = `${EVENT_PREFIX}editable-state-changed`;


export const SPECIALVARS = {
	CURRENTVALUE: "$value",
	CURRENTLISTROW: "$item",
};

//ATTRIBUTES

export const ATTRIBUTE_NAME = "name";
export const ATTRIBUTE_ENDPOINT = "endpoint";
export const ATTRIBUTE_METHOD = "method";
export const ATTRIBUTE_STATE = "state";

export const ATTRIBUTE_STEP = "step";
export const ATTRIBUTE_USE_SUMMARY_PAGE = "use-summary-page";
export const ATTRIBUTE_INPUT_MODE_AFTER_SUBMIT = "input-mode-after-submit";
export const ATTRIBUTE_REQUIRED = "required";
export const ATTRIBUTE_REQUIRED_ON_ACTIVE_ONLY = "required-on-active-only";
export const ATTRIBUTE_CONDITION = "condition";
export const ATTRIBUTE_ACTIVE = "active";
export const ATTRIBUTE_DISABLED = "disabled";
export const ATTRIBUTE_EDITABLE = "editable";
export const ATTRIBUTE_EDITABLE_CONDITION = "editable-condition";
export const ATTRIBUTE_READONLY = "readonly";
export const ATTRIBUTE_NOVALUE = "no-value";
export const ATTRIBUTE_VALID = "valid";
export const ATTRIBUTE_INVALID = "invalid";
export const ATTRIBUTE_EVALUATE = "evaluate";
export const ATTRIBUTE_CONDITION_VALID = "condition-valid";
export const ATTRIBUTE_CONDITION_INVALID = "condition-invalid";
export const ATTRIBUTE_MIN = "min";
export const ATTRIBUTE_MAX = "max";
export const ATTRIBUTE_PROGRESS = "progress";
