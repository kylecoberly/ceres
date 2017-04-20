import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import jobsPage from "../../pages/cohort-jobs";

moduleForComponent("cohort-job-stats", "Integration | Component | cohort job stats", {
	integration: true,
	beforeEach(){
		jobsPage.setContext(this);
	},
	afterEach(){
		jobsPage.removeContext();
	}
});

test("It shows job stats", function(assert){
	this.set("cohort", {
		id: 1,
		label: "g99",
		hiredRate: "50%",
		medianDaysToHire: 10,
		studentsRemaining: 10
	});

	jobsPage.render(hbs`{{cohort-job-stats cohort=cohort data-test-cohort-job-stats=true}}`);

	assert.equal(jobsPage.cohorts(0).label, "g99", "Correct cohort label");
	assert.equal(jobsPage.cohorts(0).medianDaysToHire, "10 days", "Correct average days");
});

test("It shows no average if no one has a job", function(assert){
	this.set("cohort", {
		hiredRate: "0%",
	});

	jobsPage.render(hbs`{{cohort-job-stats cohort=cohort data-test-cohort-job-stats=true}}`);

	assert.ok(jobsPage.cohorts(0).averageBlockIsHidden);
});

test("It shows 'passed' if deadline is passed", function(assert){
	this.set("cohort", {
		id: 0,
		deadlinePassed: true
	});

	jobsPage.render(hbs`{{cohort-job-stats cohort=cohort data-test-cohort-job-stats=true}}`);

	assert.equal(jobsPage.cohorts(0).daysRemaining, "PASSED");
});
