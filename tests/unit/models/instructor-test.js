import Ember from "ember";
import {moduleForModel, test} from "ember-qunit";

moduleForModel("instructor", "Unit | Model | instructor", {
	// Specify the other units that are required for this test.
	needs: []
});

test("it returns a full name", function(assert){
	let model = this.subject();
	// let store = this.store();

	Ember.run(() => {
		model.set("firstName", "Kyle");
		model.set("lastName", "Coberly");
	});
	assert.equal(model.get("fullName"), "Kyle Coberly");

	Ember.run(() => {
		model.set("firstName", "Berto");
	});
	assert.equal(model.get("fullName"), "Berto Coberly");
});
