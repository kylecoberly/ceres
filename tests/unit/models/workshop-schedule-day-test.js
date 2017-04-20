import Ember from "ember";
import {moduleForModel, test} from "ember-qunit";

moduleForModel("workshop-schedule-day", "Unit | Model | workshop schedule day", {
	needs: ["model:instructor"]
});

test("it can format the time", function(assert){
	let model = this.subject();
	Ember.run(() => model.set("date", new Date("March 15, 2017")));
	assert.equal(model.get("formattedDate"), "3/15");
});
