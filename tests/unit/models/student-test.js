import {moduleForModel, test} from "ember-qunit";

moduleForModel("student", "Unit | Model | student", {
	needs: []
});

test("it can calculate the full name", function(assert) {
	let model = this.subject({
		firstName: "Kyle",
		lastName: "Coberly"
	});

	assert.equal(model.get("fullName"), "Kyle Coberly");
});

test("it can calculate whether a student has been hired", function(assert) {
	let model = this.subject({
		hireDate: "2017-01-01"
	});

	assert.equal(model.get("isHired"), true);
	Ember.run(() => model.set("hireDate", null));
	assert.equal(model.get("isHired"), false);
});
