import Ember from "ember";
import {moduleForModel, test} from "ember-qunit";

moduleForModel("instructor", "Unit | Model | instructor", {
	needs: []
});

test("it returns a full name", function(assert){
	let model = this.subject();

	Ember.run(() => {
		model.set("firstName", "Kyle");
		model.set("lastName", "Coberly");
	});
	assert.equal(model.get("fullName"), "Kyle Coberly");

	Ember.run(() => model.set("firstName", "Berto"));
	assert.equal(model.get("fullName"), "Berto Coberly");
});
