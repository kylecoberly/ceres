import {
	create,
	visitable,
	text,
	collection
} from "ember-cli-page-object";
import testSelector from "ember-test-selectors";

export default create({
	visit: visitable('/class-metrics'),
	heading: text(testSelector("metrics-mastery-heading")),
	cohorts: collection({
		itemScope: testSelector("cohort-mastery-stats"),
		item: {
			label: text(testSelector("cohort-label")),
			timeElapsed: text(testSelector("time-elapsed")),
			mastery: collection({
				itemScope: testSelector("cohort-mastery-scores"),
				items: {
					score: text(testSelector("mastery-score")),
				}
			})
		}
	}),
});
