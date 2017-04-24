import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import workshopSchedule from "../../pages/components/workshop-schedule";

moduleForComponent("workshop-schedule", "Integration | Component | workshop schedule", {
	integration: true,
	beforeEach(){
		workshopSchedule.setContext(this);
	},
	afterEach(){
		workshopSchedule.removeContext();
	}
});

test("it shows data", function(assert){
	this.set("model", {
		workshopName: "JS",
		workshopScheduleWeeks: [{
			label: "Week 1",
			workshopScheduleDays: [{
				formattedDate: "3/15",
				instructor: {
					firstName: "Kyle"
				}
			}]
		}]
	});
	workshopSchedule.render(hbs`{{workshop-schedule-mobile model=model}}`);

	assert.equal(workshopSchedule.name, "JS");
	assert.equal(workshopSchedule.weekLabel, "Week 1");
	assert.equal(workshopSchedule.date, "3/15");
	assert.equal(workshopSchedule.instructor, "Kyle");
});
