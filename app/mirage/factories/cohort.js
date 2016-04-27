import Mirage/*, {faker} */ from "ember-cli-mirage";

export default Mirage.Factory.extend({
    name: "test cohort",
    instructors: [1, 2, 3]
});
