export default function(){
    this.namespace = "api";

    this.get("/cohorts", ["cohorts", "instructors"]);
    this.get("/cohorts/:id", ["cohort", "instructors"]);
    this.get("/instructors", ["instructors", "lesson-feedbacks"]);
    this.get("/instructors/:id", ["instructor", "lesson-feedbacks"]);
    this.get("/lessonFeedbacks", "lesson-feedbacks");
    this.get("/lessonFeedbacks/:id", "lesson-feedback");

    /*
       POST shorthands

       this.post("/contacts");
       this.post("/contacts", "user"); // specify the type of resource to be created
       */

    /*
       PUT shorthands

       this.put("/contacts/:id");
       this.put("/contacts/:id", "user"); // specify the type of resource to be updated
       */

    /*
       DELETE shorthands

       this.del("/contacts/:id");
       this.del("/contacts/:id", "user"); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del("/contacts/:id", ["contact", "addresses"]);
    */

    /*
       Function fallback. Manipulate data in the db via

       - db.{collection}
       - db.{collection}.find(id)
       - db.{collection}.where(query)
       - db.{collection}.update(target, attrs)
       - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get("/contacts/:id", function(db, request) {
    var contactId = +request.params.id;

    return {
    contact: db.contacts.find(contactId),
    addresses: db.addresses.where({contact_id: contactId})
    };
    });

*/
}

/*
   You can optionally export a config that is only loaded during tests
   export function testConfig() {

   }
   */
