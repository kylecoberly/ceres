import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import testSelector from "ember-test-selectors";

moduleForComponent("workshop-schedule-mobile", "Integration | Component | workshop schedule mobile", {
	integration: true
});

test("it shows data", function(assert){
	this.set("model", {
		workshopName: "JS",
		weeks: [{
			label: "Week 1",
			days: [{
				formattedDate: "3/15",
				instructor: {
					firstName: "Kyle"
				}
			}]
		}]
	});
	this.render(hbs`{{workshop-schedule-mobile model=model}}`);

	assert.equal(this.$(testSelector("workshop-name")).text().trim(), "JS");
	assert.equal(this.$(testSelector("week-label")).text().trim(), "Week 1");
	assert.equal(this.$(testSelector("date")).text().trim(), "3/15");
	assert.equal(this.$(testSelector("instructor")).text().trim(), "Kyle");
});
