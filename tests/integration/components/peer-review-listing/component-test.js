import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("peer-review-listing", "Integration | Component | peer review listing", {
    integration: true,
    beforeEach(){
        this.peerReview = {
            id: 1,
            title: "JavaScript Introduction: Part 2"
        };
    }
});

test("It shows a link to a peer review", function(assert) {
    this.render(hbs`{{peer-review-listing peerReview=peerReview}}`);

    assert.equal(this.$("li a").text().trim(), "JavaScript Introduction: Part 2");
});
