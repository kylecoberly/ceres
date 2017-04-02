import Ember from 'ember';

export default Ember.Route.extend({
	model(){
		return {
			workshopSchedules: [{
				id: 1,
				workshopName: "JavaScript Fundamentals",
				weeks: [{
					label: "Week 1",
					days: [{
						date: "3/14",
						instructor: "Berto"
					},{
						date: "3/16",
						instructor: "Berto"
					}]
				},{
					label: "Week 2",
					days: [{
						date: "3/21",
						instructor: "Danny"
					},{
						date: "3/23",
						instructor: "Isaac"
					}]
				},{
					label: "Week 3",
					days: [{
						date: "3/28",
						instructor: "Peter"
					},{
						date: "3/30",
						instructor: "Peter"
					}]
				},{
					label: "Week 4",
					days: [{
						date: "4/4",
						instructor: "Peter"
					},{
						date: "4/6",
						instructor: "Peter"
					}]
				},{
					label: "Week 5",
					days: [{
						date: "4/11",
						instructor: "Peter"
					},{
						date: "4/13",
						instructor: "Peter"
					}]
				},{
					label: "Week 6",
					days: [{
						date: "4/18",
						instructor: "Peter"
					},{
						date: "4/20",
						instructor: "Peter"
					}]
				},{
					label: "Week 7",
					days: [{
						date: "4/25",
						instructor: "Peter"
					},{
						date: "4/27",
						instructor: "Peter"
					}]
				},{
					label: "Week 8",
					days: [{
						date: "5/2",
						instructor: "Peter"
					},{
						date: "5/4",
						instructor: "Peter"
					}]
				}]
			}]
		};
	}
});
