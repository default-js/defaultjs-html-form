import GLOBAL from "@default-js/defaultjs-common-utils/src/Global.js";
import {Template, Renderer} from "./index.js"

GLOBAL.defaultjs = GLOBAL.defaultjs || {};
GLOBAL.defaultjs.jstl = GLOBAL.defaultjs.tl = GLOBAL.defaultjs.tl || {
	VERSION : "${version}",
	Template: Template,
	Renderer: Renderer
};