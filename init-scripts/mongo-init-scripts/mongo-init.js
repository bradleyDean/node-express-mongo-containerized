// Users won't show up unless we create a collection in it first.
db = db.getSiblingDB('myAppDb');
db.createCollection("initialCollection");


var userResult = db.createUser({
  user: "myAppDbUser",
  pwd: "userPassword", // Replace with a secure password
  roles: [
    { role: "readWrite", db: "myAppDb" }
  ]
});

console.log("*** userResult: " + JSON.stringify(userResult) + " ***");

var adminUserResult = db.createUser({
  user: "adminUser",
  pwd: "adminPassword", // Replace with a secure password
  roles: [
    { role: "dbAdmin", db: "myAppDb" },
    { role: "readWrite", db: "myAppDb" }
  ]
});
// connect string (but not working)
// mongodb://adminUser:adminPassword@localhost:27017/myAppDb?authSource=admin
console.log("*** adminUserResult: " + JSON.stringify(adminUserResult) + " ***");
