  const envType = process.env.ENV_TYPE || 'local';
  const dbName = 'myAppDb';
  const defaultUser = 'myAppDbUser';
  const defaultPassword = 'userPassword';

  // current admin user:
  // mongodb://adminUser:adminPassword@localhost:27017/admin

/* **** Mongo connection string Example **** */
//  mongodb://user123:password123@localhost:27017/myAppDb?authSource=admin
//
//  user123 is the username,
//  password123 is the password,
//  localhost is the hostname where MongoDB is running,
//  27017 is the default port for MongoDB,
//  myAppDb is the database name,
//  authSource=admin is a parameter specifying the database that holds the user's credentials.
export const getMongoUri = (user = defaultUser , password = defaultPassword, db = dbName) => {
  switch (envType) {
    case 'local':
      return `mongodb://${user}:${password}@localhost:27017/${db}`;
      // return `mongodb://localhost:27017/${dbName}`;
    case 'docker':
      return `mongodb://${user}:${password}@mongo:27017/${db}`;
      // return `mongodb://mongo:27017/${dbName}`;
    case 'circleci':
      // circle does not use docker-compose up, so local host is host name
      return `mongodb://${user}:${password}@localhost:27017/${db}`;
      // return `mongodb://localhost:27017/${dbName}`;
    // Add more cases as needed
    default:
      return `mongodb://${user}:${password}@localhost:27017/${db}`;
      // return `mongodb://localhost:27017/${db}`;
  }
};
// export const getMongoUri = () => {
//   switch (envType) {
//     case 'local':
//       return `mongodb://localhost:27017/${dbName}`;
//     case 'docker':
//       return `mongodb://mongo:27017/${dbName}`;
//     case 'circleci':
//       // circle does not use docker-compoise up, so local host is host name
//       return `mongodb://localhost:27017/${dbName}`;
//     // Add more cases as needed
//     default:
//       return `mongodb://localhost:27017/${dbName}`;
//   }
// };