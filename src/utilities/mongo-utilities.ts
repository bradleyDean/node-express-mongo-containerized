  const envType = process.env.ENV_TYPE || 'local';
  const dbName = 'myAppDb';

// export const getMongoUri = () => {
//   switch (envType) {
//     case 'local':
//       return `mongodb://localhost:27017/${dbName}`;
//     case 'docker':
//       return `mongodb://mongo:27017/${dbName}`;
//     case 'circleci':
//       // Add CircleCI specific URI if needed
//       return `mongodb://mongo:27017/${dbName}`;
//     // Add more cases as needed
//     default:
//       return `mongodb://localhost:27017/${dbName}`;
//   }
// };

export const getMongoUri = () => `mongodb://mongo:27017/${dbName}`;