import Ember from "ember";
import CohortTimeUtilitiesMixin from "ceres/mixins/cohort-time-utilities";
import {module, test} from "qunit";

module("Unit | Mixin | cohort time utilities");

test("it can calculate time remaining for a cohort", function(assert) {
	let CohortTime = Ember.Object.extend(CohortTimeUtilitiesMixin);
	let subject = CohortTime.create({
		hiringDeadline: new Date("2017-02-03"),
		time: {
			today: new Date("2017-02-01")
		}
	});

	assert.equal(subject.get("daysToHiringDeadline"), 2);
});

test("it can calculate whether a deadline hasn't passed", function(assert) {
	let CohortTime = Ember.Object.extend(CohortTimeUtilitiesMixin);
	let subject = CohortTime.create({
		hiringDeadline: new Date("2017-01-02"),
		time: {
			today: new Date("2017-01-01")
		}
	});

	assert.equal(subject.get("deadlinePassed"), false, "shows not passed");
});

test("it can calculate whether a deadline has passed", function(assert) {
	let CohortTime = Ember.Object.extend(CohortTimeUtilitiesMixin);
	let subject = CohortTime.create({
		hiringDeadline: new Date("2017-01-01"),
		time: {
			today: new Date("2017-02-01")
		}
	});

	assert.equal(subject.get("deadlinePassed"), true, "shows passed");
});

test("it can calculate if the cohort has not ended", function(assert) {
	let CohortTime = Ember.Object.extend(CohortTimeUtilitiesMixin);
	let subject = CohortTime.create({
		lastDay: new Date("2017-01-02"),
		time: {
			today: new Date("2017-01-01")
		}
	});

	assert.equal(subject.get("cohortComplete"), false, "shows not complete");
});

test("it can calculate if the cohort has ended", function(assert) {
	let CohortTime = Ember.Object.extend(CohortTimeUtilitiesMixin);
	let subject = CohortTime.create({
		lastDay: new Date("2017-01-02"),
		time: {
			today: new Date("2017-02-01")
		}
	});

	assert.equal(subject.get("cohortComplete"), true, "shows complete");
});

test("it can calculate the days elapsed in a cohort", function(assert) {
	let CohortTime = Ember.Object.extend(CohortTimeUtilitiesMixin);
	let subject = CohortTime.create({
		firstDay: new Date("2017-01-01"),
		time: {
			today: new Date("2017-01-02")
		}
	});

	assert.equal(subject.get("daysElapsed"), 1);
});

test("it can calculate the days remaining in a cohort", function(assert) {
	let CohortTime = Ember.Object.extend(CohortTimeUtilitiesMixin);
	let subject = CohortTime.create({
		lastDay: new Date("2017-01-10"),
		time: {
			today: new Date("2017-01-01")
		}
	});

	assert.equal(subject.get("daysRemaining"), 9);
});

test("it can calculate the total days in a cohort", function(assert) {
	let CohortTime = Ember.Object.extend(CohortTimeUtilitiesMixin);
	let subject = CohortTime.create({
		firstDay: new Date("2017-01-01"),
		lastDay: new Date("2017-01-05")
	});

	assert.equal(subject.get("totalDays"), 4);
});
