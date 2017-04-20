import { moduleFor, test } from "ember-qunit";

moduleFor("service:time", "Unit | Service | time", {
});

test("it runs today", function(assert) {
	let service = this.subject();
	assert.deepEqual(service.get("today"), new Date());
});
