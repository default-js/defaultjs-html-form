import GLOBAL from "@default-js/defaultjs-common-utils/src/Global";
import {Form, Field} from "./index"

GLOBAL.defaultjs = GLOBAL.defaultjs || {};
GLOBAL.defaultjs.html = GLOBAL.defaultjs.html || {};
GLOBAL.defaultjs.html.form = GLOBAL.defaultjs.html.form || {
	VERSION : "${version}",
	Form,
	Field
};