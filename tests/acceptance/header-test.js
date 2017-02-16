import { test } from 'qunit';
import moduleForAcceptance from 'ceres2/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | header');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find("h1").text(), "Ceres");
    assert.equal(find("#logo").attr("src"), "images/logo.png");
  });
});
