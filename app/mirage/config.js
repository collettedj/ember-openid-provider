export default function() {

    this.namespace = '/api/v1';

    this.get('/users', function(db){
      return {
        users: db.users.find()
      };
    });

    this.get('/users/:id', function(db, request) {
      var id = request.params.id;
      return {
        user: db.users.find(id),
        clients: db.clients.where({userId:id})
      };
    });

    this.put('/users/:id', function(db, request) {
      var id = request.params.id;
      const user = JSON.parse(request.requestBody).user;
      user._id = id;
      return {
        user: user,
      };
    });

    this.get('/clients', function(db){
      return {
        clients: db.clients.find()
      };
    });

    this.get('/clients/:id', function(db, request) {
      var id = request.params.id;
      return {
        user: db.clients.find(id)
      };
    });

    this.post('/authenticate/signup', function(db, request){
      const body = JSON.parse(request.requestBody);
      body._id=5;
      return body;
    });

    this.post('/authenticate/login', function(){
      return {
        _id: 5,
        firstname:"first",
        lastname:"last",
        username:"test",
      };
    });

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
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
