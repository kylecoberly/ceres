import {test} from "qunit";
import moduleForAcceptance from "ceres/tests/helpers/module-for-acceptance";
import page from "ceres/tests/pages/class-metrics";
import testSelector from "ember-test-selectors";

moduleForAcceptance("Acceptance | job metrics");

test("It should show job statistics", function(assert){
	var student1 = server.create("student", {
		isHired: true
	});
	var student2 = server.create("student");
	server.create("cohort", {
		id: 0,
		label: "g[99]",
		students: [student1, student2],
		studentCount: 10,
		totalHired: 6
	});

	page.visit();
	andThen(function(){
		assert.equal(currentURL(), "/class-metrics", "Correct URL");
		assert.equal(find(testSelector("cohort-label"), 0).text().trim(), "g[99]", "Correct cohort label");
		assert.equal(find(`${testSelector("cohort-id", 0)} ${testSelector("progress-percentage")}`).text().trim(), "50%", "Correct percentage");
	});
});
