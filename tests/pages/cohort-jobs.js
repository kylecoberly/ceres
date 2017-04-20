import {
	create,
	visitable,
	text,
	attribute,
	collection,
	isHidden
} from "ember-cli-page-object";
import testSelector from "ember-test-selectors";

export default create({
	visit: visitable("/job-metrics"),
	heading: text(testSelector("metrics-mastery-heading")),
	cohorts: collection({
		itemScope: testSelector("cohort-job-stats"),
		item: {
			label: attribute("alt", testSelector("cohort-label")),
			jobProgressPercentage: text(testSelector("progress-percentage")),
			averageBlockIsHidden: isHidden(testSelector("average")),
			medianDaysToHire: text(testSelector("cohort-median-days-to-hire")),
			daysRemaining: text(testSelector("days-remaining"))
		}
	})
});
