import config from 'config';

const { url } = config.get('dbConfig');

export const dbConnection = {
  url: url,
  options: {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    dbName : "test"
  },  
};
