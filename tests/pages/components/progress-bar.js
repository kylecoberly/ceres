import {
	text,
	create
} from "ember-cli-page-object";
import testSelector from "ember-test-selectors";

export default create({
	progressPercentage: text(testSelector("progress-percentage")),
	remaining: text(testSelector("remaining"))
});
