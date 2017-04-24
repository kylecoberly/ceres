import {
	create,
	visitable,
	text,
	collection
} from "ember-cli-page-object";
import testSelector from "ember-test-selectors";

export default create({
	visit: visitable("/mastery-metrics"),
	heading: text(testSelector("metrics-mastery-heading")),
	cohorts: collection({
		itemScope: testSelector("cohort-mastery-stats"),
		item: {
			label: text(testSelector("cohort-label")),
			timeElapsed: text(testSelector("time-elapsed")),
			mastery: collection({
				itemScope: testSelector("mastery-score"),
				item: {
					score: text()
				}
			})
		}
	}),
});
