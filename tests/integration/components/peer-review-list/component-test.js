import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("peer-review-list", "Integration | Component | peer review list", {
    integration: true,
    beforeEach(){
        this.peerReviews = [{
            id: 1
        },{
            id: 2
        },{
            id: 3
        }];
    }
});

test("it renders", function(assert){
    this.render(hbs`{{peer-review-list peerReviews=peerReviews}}`);

    assert.equal(this.$("ul.peer-reviews li").length, 3, "3 items show up");
});
