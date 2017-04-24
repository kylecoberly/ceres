import {moduleForModel, test} from "ember-qunit";

moduleForModel("performance", "Unit | Model | performance", {
	needs: ["model:standard"]
});

test("it exists", function(assert) {
	let model = this.subject();
	// let store = this.store();
	assert.ok(!!model);
});
