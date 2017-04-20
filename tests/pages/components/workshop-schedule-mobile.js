import {
	text,
	create
} from "ember-cli-page-object";
import testSelector from "ember-test-selectors";

export default create({
	name: text(testSelector("workshop-name")),
	weekLabel: text(testSelector("week-label")),
	date: text(testSelector("date")),
	instructor: text(testSelector("instructor"))
});
