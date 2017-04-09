import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import testSelector from "ember-test-selectors";

moduleForComponent("cohort-job-stats", "Integration | Component | cohort job stats", {
	integration: true
});

test("It shows job stats", function(assert){
	this.set("cohort", {
		id: 1,
		label: "g99",
		hiredRate: "50%",
		medianDaysToHire: 10,
		studentsRemaining: 10
	});

	this.render(hbs`{{cohort-job-stats cohort=cohort}}`);

	assert.equal(this.$(testSelector("cohort-label"), 1).text().trim(), "g99", "Correct cohort label");
	assert.equal(this.$(testSelector("cohort-median-days-to-hire"), 1).text().trim(), "10 days", "Correct average days");
});

test("It shows no average if no one has a job", function(assert){
	this.set("cohort", {
		hiredRate: "0%",
	});

	this.render(hbs`{{cohort-job-stats cohort=cohort}}`);

	assert.equal(this.$(testSelector("average")).length, 0, "Doesn't show average");
});

test("It shows 'passed' if deadline is passed", function(assert){
	this.set("cohort", {
		id: 0,
		deadlinePassed: true
	});

	this.render(hbs`{{cohort-job-stats cohort=cohort}}`);

	assert.equal(this.$(testSelector("days-remaining"), 0).text().trim(), "PASSED");
});
