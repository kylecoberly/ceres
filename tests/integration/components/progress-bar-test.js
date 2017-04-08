import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import testSelector from "ember-test-selectors";

moduleForComponent("progress-bar", "Integration | Component | progress bar", {
	integration: true
});

test("it displays stats", function(assert){
	this.set("max", 10);
	this.set("value", 6);
	this.render(hbs`{{progress-bar max=max value=value}}`);

	assert.equal(this.$(testSelector("progress-percentage")).text().trim(), "60%");
	assert.equal(this.$(testSelector("remaining")).text().trim(), "4");
});
