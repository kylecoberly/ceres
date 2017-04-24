import {moduleFor, test} from "ember-qunit";

moduleFor("controller:mastery-metrics", "Unit | Controller | mastery metrics", {
	needs: []
});

test("it sorts menu items", function(assert) {
	let controller = this.subject({
		model: [{
			label: "g1",
			firstDay: "1"
		},{
			label: "g3",
			firstDay: "3"
		},{
			label: "g2",
			firstDay: "2"
		}]
	});

	assert.deepEqual(controller.get("sortedCohorts"), [{
		label: "g1",
		firstDay: "1"
	},{
		label: "g2",
		firstDay: "2"
	},{
		label: "g3",
		firstDay: "3"
	}]);
});
