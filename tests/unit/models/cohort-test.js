import Ember from "ember";
import {moduleForModel, test} from "ember-qunit";

moduleForModel("cohort", "Unit | Model | cohort", {
	needs: ["model:student", "model:performance", "model:standard", "service:time"]
});

test("it can count the number of students", function(assert) {
	let model = this.subject();

	Ember.run(() => {
		model.set("students", [
			this.store().createRecord("student", {}),
			this.store().createRecord("student", {}),
			this.store().createRecord("student", {})
		]);
	});

	assert.equal(model.get("studentCount"), 3);
});

test("it can count the number of hired students", function(assert) {
	let model = this.subject();

	Ember.run(() => {
		model.set("students", [
			this.store().createRecord("student", {isHired: true}),
			this.store().createRecord("student", {isHired: true}),
			this.store().createRecord("student", {isHired: false})
		]);
	});

	assert.equal(model.get("totalHired"), 2);
});

test("it can calculate the median days to hire", function(assert) {
	let model = this.subject({
		lastDay: new Date("2017-02-01")
	});

	Ember.run(() => {
		model.set("students", [
			this.store().createRecord("student", {hireDate: "2017-02-02"}),
			this.store().createRecord("student", {hireDate: "2017-02-03"}),
			this.store().createRecord("student", {hireDate: "2017-02-04"})
		]);
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

test("it returns 100% time elapsed if the cohort is over", function(assert) {
	var mockTimeService = Ember.Service.extend({
		today: new Date("2017-02-01")
	});
	this.register("service:time", mockTimeService);
	let model = this.subject({
		firstDay: new Date("2017-01-01"),
		lastDay: new Date("2017-01-02")
	});

	assert.equal(model.get("percentageElapsed"), "100%");
});

test("it can aggregate student performances", function(assert){
	let model;
	Ember.run(() => {
		model = this.subject({
			students: [
				this.store().createRecord("student", {
					id: 1,
					performances: [this.store().createRecord("performance", {
						score: "1"
					})]
				}),
				this.store().createRecord("student", {
					id: 2,
					performances: [this.store().createRecord("performance", {
						score: "3"
					})]
				})
			]
		});
	});

	assert.deepEqual(model.get("performances"), [{
		studentId: "1",
		score: "1"
	},{
		studentId: "2",
		score: "3"
	}]);
});

test("it can calculate cohort performances", function(assert){
	let model = this.subject({
		performances: [{
			score: "0"
		},{
			score: "1"
		},{
			score: "1"
		},{
			score: "3"
		},{
			score: "2"
		}]
	});

	assert.deepEqual(model.get("scores"), [{
		count: 1,
		label: "0",
		proportion: 0.20,
		percentage: "20%"
	},{
		count: 2,
		label: "1",
		proportion: 0.40,
		percentage: "40%"
	},{
		count: 1,
		label: "2",
		proportion: 0.20,
		percentage: "20%"
	},{
		count: 1,
		label: "3",
		proportion: 0.20,
		percentage: "20%"
	}]);
});

test("it should generate an image URL based on a number", function(assert){
	let model = this.subject({
		logoNumber: 25
	});

	assert.equal(model.get("logoUrl"), "https://badge.galvanize.network/25.png");
});
