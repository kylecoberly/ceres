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
