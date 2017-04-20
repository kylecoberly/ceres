import Ember from "ember";
import {test} from "qunit";
import moduleForAcceptance from "ceres/tests/helpers/module-for-acceptance";
import masteryPage from "../pages/cohort-mastery";

var mockTimeService = Ember.Service.extend({
	today: new Date("2017-02-02")
});

moduleForAcceptance("Acceptance | mastery metrics", {
	beforeEach(){
		this.application.__deprecatedInstance__.register("service:time", mockTimeService);
	}
});

test("It should show mastery totals per class", function(assert){
	var standard1 = server.create("standard");
	var standard2 = server.create("standard");
	var performance1 = server.create("performance", {
		score: 2,
		standard: standard1
	});
	var performance2 = server.create("performance", {
		score: 3,
		standard: standard2
	});
	var performance3 = server.create("performance", {
		score: 2,
		standard: standard1
	});
	var student1 = server.create("student", {
		performances: [performance1, performance2]
	});
	var student2 = server.create("student", {
		performances: [performance3]
	});
	server.create("cohort", {
		label: "g99",
		isActive: true,
		firstDay: "2017-02-01",
		lastDay: "2017-02-03",
		students: [student1, student2]
	});
	server.create("cohort", {
		label: "g0",
		isActive: true,
		firstDay: "2017-01-01",
	});

	masteryPage.visit();

	andThen(function() {
		assert.equal(currentURL(), "/class-metrics");
		assert.equal(masteryPage.heading, "Mastery", "Shows the right heading");
		assert.equal(masteryPage.cohorts().count, 2, "Correct number of cohorts show up");
		assert.equal(masteryPage.cohorts(0).label, "g0", "Earlier cohort is first");
		assert.equal(masteryPage.cohorts(1).label, "g99", "Later cohort is last");
		// assert.equal(masteryPage.cohorts(0).mastery(0).score, "33%", "Shows the right number of 3s");
		// assert.equal(masteryPage.cohorts(0).mastery(1).score, "67%", "Shows the right number of 2s");
		assert.equal(masteryPage.cohorts(1).timeElapsed, "50%", "Shows the right time elapsed");
	});
});
