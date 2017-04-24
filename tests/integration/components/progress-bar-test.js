import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import progressBar from "../../pages/components/progress-bar";

moduleForComponent("progress-bar", "Integration | Component | progress bar", {
	integration: true,
	beforeEach(){
		progressBar.setContext(this);
	},
	afterEach(){
		progressBar.removeContext();
	}
});

test("it displays stats", function(assert){
	this.set("max", 10);
	this.set("value", 6);
	progressBar.render(hbs`{{progress-bar max=max value=value}}`);

	assert.equal(progressBar.progressPercentage, "60%");
	assert.equal(progressBar.remaining, "4");
});
