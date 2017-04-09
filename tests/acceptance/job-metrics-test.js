import {test} from "qunit";
import moduleForAcceptance from "ceres/tests/helpers/module-for-acceptance";
import page from "ceres/tests/pages/class-metrics";
import testSelector from "ember-test-selectors";

moduleForAcceptance("Acceptance | job metrics");

test("It should show job statistics", function(assert){
	var student1 = server.create("student", {
		hireDate: "2017-01-15"
	});
	var student2 = server.create("student");
	server.create("cohort", {
		id: 0,
		label: "g[99]",
		isActive: true,
		students: [student1, student2]
	});

	page.visit();
	andThen(function(){
		assert.equal(currentURL(), "/class-metrics", "Correct URL");
		assert.equal(find(testSelector("cohort-label"), 0).text().trim(), "g[99]", "Correct cohort label");
		assert.equal(find(`${testSelector("cohort-id", 0)} ${testSelector("progress-percentage")}`).text().trim(), "50%", "Correct percentage");
	});
});

test("It shows cohort job widgets sorted by start date", function(assert){
	server.create("cohort", {
		label: "g0",
		firstDay: "2017-01-01",
		isActive: true
	});
	server.create("cohort", {
		label: "g2",
		firstDay: "2017-01-03",
		isActive: true
	});
	server.create("cohort", {
		label: "g1",
		firstDay: "2017-01-02",
		isActive: true
	});

	page.visit();
	andThen(function(){
		assert.equal(find(".cohort-job-stats:nth-child(1) .cohort-label h3").text().trim(), "g0");
		assert.equal(find(".cohort-job-stats:nth-child(2) .cohort-label h3").text().trim(), "g1");
		assert.equal(find(".cohort-job-stats:nth-child(3) .cohort-label h3").text().trim(), "g2");
	});
});
