import Ember from "ember";
import {moduleForModel, test} from "ember-qunit";

moduleForModel("workshop-schedule-day", "Unit | Model | workshop schedule day", {
	// Specify the other units that are required for this test.
	needs: ["model:instructor"]
});

test("it can format the time", function(assert){
	let model = this.subject();
	const NOW = new Date("March 15, 2017");
	Ember.run(()=>{
		model.set("date", NOW);
	});
	assert.equal(model.get("formattedDate"), "3/15");
});
