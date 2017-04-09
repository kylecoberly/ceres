import Ember from "ember";
import {moduleForModel, test} from "ember-qunit";

moduleForModel("cohort", "Unit | Model | cohort", {
	needs: ["model:student"]
});

test("it can count the number of students", function(assert) {
	let model = this.subject();

	Ember.run(() => {
		let student1 = this.store().createRecord("student", {});
		let student2 = this.store().createRecord("student", {});
		let student3 = this.store().createRecord("student", {});
		model.set("students", [student1, student2, student3]);
	});

	assert.equal(model.get("studentCount"), 3);
});

test("it can count the number of hired students", function(assert) {
	let model = this.subject();

	Ember.run(() => {
		let student1 = this.store().createRecord("student", {
			isHired: true
		});
		let student2 = this.store().createRecord("student", {
			isHired: true
		});
		let student3 = this.store().createRecord("student", {
			isHired: false
		});
		model.set("students", [student1, student2, student3]);
	});

	assert.equal(model.get("totalHired"), 2);
});

test("it can calculate the median days to hire", function(assert) {
	let model = this.subject({
		lastDay: "2017-02-01"
	});

	Ember.run(() => {
		let student1 = this.store().createRecord("student", {
			hireDate: "2017-02-02"
		});
		let student2 = this.store().createRecord("student", {
			hireDate: "2017-02-03"
		});
		let student3 = this.store().createRecord("student", {
			hireDate: "2017-02-04"
		});
		model.set("students", [student1, student2, student3]);
	});

	assert.equal(model.get("medianDaysToHire"), 2);
});

test("it can calculate time remaining for a cohort", function(assert) {
	let model = this.subject({
		today: "2017-02-01",
		hiringDeadline: "2017-02-03"
	});

	assert.equal(model.get("daysToHiringDeadline"), 2);
});

test("it can calculate whether a deadline has passed", function(assert) {
	let model = this.subject({
		today: "2017-01-01",
		hiringDeadline: "2017-01-02"
	});

	assert.equal(model.get("deadlinePassed"), false, "shows not passed");
	Ember.run(() => model.set("today", "2017-02-01"));
	assert.equal(model.get("deadlinePassed"), true, "shows passed");
});

test("it can calculate whether or not the cohort has ended", function(assert) {
	let model = this.subject({
		today: "2017-01-01",
		lastDay: "2017-01-02"
	});

	assert.equal(model.get("cohortComplete"), false, "shows not complete");
	Ember.run(() => model.set("today", "2017-02-01"));
	assert.equal(model.get("cohortComplete"), true, "shows complete");
});
