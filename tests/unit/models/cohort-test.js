import Ember from "ember";
import {moduleForModel, test} from "ember-qunit";

moduleForModel("cohort", "Unit | Model | cohort", {
	needs: ["model:student", "model:performance", "service:time"]
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
		lastDay: new Date("2017-02-01")
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
	var mockTimeService = Ember.Service.extend({
		today: new Date("2017-02-01")
	});
	this.register("service:time", mockTimeService);
	let model = this.subject({
		hiringDeadline: new Date("2017-02-03")
	});

	assert.equal(model.get("daysToHiringDeadline"), 2);
});

test("it can calculate whether a deadline hasn't passed", function(assert) {
	var mockTimeService = Ember.Service.extend({
		today: new Date("2017-01-01")
	});
	this.register("service:time", mockTimeService);
	let model = this.subject({
		hiringDeadline: new Date("2017-01-02")
	});

	assert.equal(model.get("deadlinePassed"), false, "shows not passed");
});

test("it can calculate whether a deadline has passed", function(assert) {
	var mockTimeService = Ember.Service.extend({
		today: new Date("2017-02-01")
	});
	this.register("service:time", mockTimeService);
	let model = this.subject({
		hiringDeadline: new Date("2017-01-01")
	});

	assert.equal(model.get("deadlinePassed"), true, "shows passed");
});

test("it can calculate if the cohort has not ended", function(assert) {
	var mockTimeService = Ember.Service.extend({
		today: new Date("2017-01-01")
	});
	this.register("service:time", mockTimeService);
	let model = this.subject({
		lastDay: new Date("2017-01-02")
	});

	assert.equal(model.get("cohortComplete"), false, "shows not complete");
});

test("it can calculate if the cohort has ended", function(assert) {
	var mockTimeService = Ember.Service.extend({
		today: new Date("2017-02-01")
	});
	this.register("service:time", mockTimeService);
	let model = this.subject({
		lastDay: new Date("2017-01-02")
	});

	assert.equal(model.get("cohortComplete"), true, "shows complete");
});

// test("it can calculate the score proportions for a cohort", function(assert) {
// 	let model;
// 	Ember.run(() => {
// 		var performances = [
// 			this.store().createRecord("performance", {score: 0}),
// 			this.store().createRecord("performance", {score: 0}),
// 			this.store().createRecord("performance", {score: 0}),
// 			this.store().createRecord("performance", {score: 0})
// 		]
// 		var students = [
// 			this.store().createRecord("student", {performances: [performances[0], performances[1]]}),
// 			this.store().createRecord("student", {performances: [performances[2], performances[3]]})
// 		];
// 		model = this.subject({
// 			students: [students[0], students[1]]
// 		});
// 	});

// 	assert.deepEqual(model.get("scores"), [{
// 		label: "0",
// 		proportion: 0.25,
// 		percentage: "25%"
// 	},{
// 		label: "1",
// 		proportion: 0.25,
// 		percentage: "25%"
// 	},{
// 		label: "2",
// 		proportion: 0.25,
// 		percentage: "25%"
// 	},{
// 		label: "3",
// 		proportion: 0.25,
// 		percentage: "25%"
// 	}]);
// });

test("it can calculate the days elapsed in a cohort", function(assert) {
	var mockTimeService = Ember.Service.extend({
		today: new Date("2017-01-02")
	});
	this.register("service:time", mockTimeService);
	let model = this.subject({
		firstDay: new Date("2017-01-01")
	});

	assert.equal(model.get("daysElapsed"), 1);
});

test("it can calculate the days remaining in a cohort", function(assert) {
	var mockTimeService = Ember.Service.extend({
		today: new Date("2017-01-01")
	});
	this.register("service:time", mockTimeService);
	let model = this.subject({
		lastDay: new Date("2017-01-10")
	});

	assert.equal(model.get("daysRemaining"), 9);
});

test("it can calculate the total days in a cohort", function(assert) {
	let model = this.subject({
		firstDay: new Date("2017-01-01"),
		lastDay: new Date("2017-01-05")
	});

	assert.equal(model.get("totalDays"), 4);
});

test("it can calculate the percentage of time elapsed in a cohort", function(assert) {
	var mockTimeService = Ember.Service.extend({
		today: new Date("2017-01-02")
	});
	this.register("service:time", mockTimeService);
	let model = this.subject({
		firstDay: new Date("2017-01-01"),
		lastDay: new Date("2017-01-05")
	});

	assert.equal(model.get("percentageElapsed"), "25%");
});
