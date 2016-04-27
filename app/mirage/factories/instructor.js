import Mirage/*, {faker} */ from "ember-cli-mirage";

export default Mirage.Factory.extend({
    name: "test instructor",
    cohort: 1,
    "lesson-feedbacks": [1]
});
