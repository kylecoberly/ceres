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
	server.create("cohort", {
		label: "g99",
		isActive: true,
		firstDay: "2017-02-01",
		lastDay: "2017-02-03",
		students: [server.create("student", {
			performances: [server.create("performance", {
				score: "2",
			}), server.create("performance", {
				score: "3",
			})]
		}), server.create("student", {
			performances: [server.create("performance", {
				score: "2",
			})]
		})]
	});
	server.create("cohort", {
		label: "g0",
		isActive: true,
		firstDay: "2017-01-01",
	});

	masteryPage.visit();

	andThen(function(){
		assert.equal(currentURL(), "/mastery-metrics");
		assert.equal(masteryPage.heading, "Mastery", "Shows the right heading");
		assert.equal(masteryPage.cohorts().count, 2, "Correct number of cohorts show up");
		assert.equal(masteryPage.cohorts(0).label, "g0", "Earlier cohort is first");
		assert.equal(masteryPage.cohorts(1).label, "g99", "Later cohort is last");
		assert.equal(masteryPage.cohorts(1).mastery(1).score, "33%", "Shows the right number of 3s");
		assert.equal(masteryPage.cohorts(1).mastery(0).score, "66%", "Shows the right number of 2s");
		assert.equal(masteryPage.cohorts(1).timeElapsed, "50%", "Shows the right time elapsed");
	});
});
