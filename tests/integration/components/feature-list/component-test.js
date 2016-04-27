import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("feature-list", "Integration | Component | feature list", {
    integration: true
});

test("it renders", function(assert) {
    this.render(hbs`{{feature-list}}`);

    assert.equal(this.$("ul.features li").length, 1, "Right number of features");
    assert.equal(this.$("ul.features li:first a").text(), "Peer Feedback", "Right label");
});
