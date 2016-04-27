import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("cohort-listing", "Integration | Component | cohort listing", {
    integration: true,
    beforeEach(){
        this.cohort = {
            id: 1,
            name: "g15"
        };
    }
});

test("It displays the name", function(assert){
    this.render(hbs`{{cohort-listing cohort=cohort}}`);

    assert.equal(this.$("li a").text().trim(), "g15");
});
