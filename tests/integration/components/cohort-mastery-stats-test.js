import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import masteryPage from "../../pages/cohort-mastery";

moduleForComponent("cohort-mastery-stats", "Integration | Component | cohort mastery stats", {
	integration: true,
	beforeEach(){
		masteryPage.setContext(this);
	},
	afterEach(){
		masteryPage.removeContext();
	}
});

test("it shows statistics correctly", function(assert){
	this.set("cohort", {
		label: "g99",
		isActive: true,
		firstDay: "2017-01-02",
		today: "2017-01-03",
		lastDay: "2017-01-04",
		percentageElapsed: "50%",
		scores: [{
			label: "0",
			percentage: "24%",
		},{
			label: "1",
			percentage: "38%",
		},{
			label: "2",
			percentage: "25%",
		},{
			label: "3",
			percentage: "13%",
		}],
		students: [{
			performances: [{
				score: 1,
			}, {
				score: 1,
			}, {
				score: 2,
			}, {
				score: 3,
			}]
		}, {
			performances: [{
				score: 0,
			}, {
				score: 0,
			}, {
				score: 1,
			}, {
				score: 2,
			}]
		}]
	});

	masteryPage.render(hbs`{{cohort-mastery-stats cohort=cohort data-test-cohort-mastery-stats=true}}`);

	assert.equal(masteryPage.cohorts(0).label, "g99", "Shows label correctly");
	assert.equal(masteryPage.cohorts(0).mastery(3).score, "13%", "Shows 3s correctly");
	assert.equal(masteryPage.cohorts(0).mastery(2).score, "25%", "Shows 2s correctly");
	assert.equal(masteryPage.cohorts(0).mastery(1).score, "38%", "Shows 1s correctly");
	assert.equal(masteryPage.cohorts(0).mastery(0).score, "24%", "Shows 0s correctly");
	assert.equal(masteryPage.cohorts(0).timeElapsed, "50%", "Shows time elapsed correctly");
});
