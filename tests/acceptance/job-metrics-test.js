import {test} from "qunit";
import moduleForAcceptance from "ceres/tests/helpers/module-for-acceptance";
import jobsPage from "ceres/tests/pages/cohort-jobs";

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

	jobsPage.visit();
	andThen(function(){
		assert.equal(currentURL(), "/job-metrics", "Correct URL");
		assert.equal(jobsPage.cohorts(0).label, "g[99]", "Correct cohort label");
		assert.equal(jobsPage.cohorts(0).jobProgressPercentage, "50%", "Correct percentage");
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

	jobsPage.visit();
	andThen(function(){
		assert.equal(jobsPage.cohorts(0).label, "g0");
		assert.equal(jobsPage.cohorts(1).label, "g1");
		assert.equal(jobsPage.cohorts(2).label, "g2");
	});
});
