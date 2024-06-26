const database = require('../../config/database');

const dbService = (environment, migrate) => {
  const authenticateDB = () => database.authenticate();

  const dropDB = () => database.drop();

  const syncDB = () => database.sync();

  const successfulDBStart = () => (
    console.info('connect to db')
  );

  const errorDBStart = (err) => (
    console.info('unable to connect to the database:', err)
  );

  const wrongEnvironment = () => {
    console.warn(`only development, staging, test and production are valid NODE_ENV variables but ${environment} is specified`);
    return process.exit(1);
  };

  const startMigrateTrue = async () => {
    try {
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startMigrateFalse = async () => {
    try {
      await dropDB();
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startDev = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      successfulDBStart();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startRelease = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      successfulDBStart();
    } catch (err) {
      return errorDBStart(err);
    }
  };
  const startCache = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      successfulDBStart();
    } catch (err) {
      return errorDBStart(err);
    }
  };
  const startTest = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      successfulDBStart();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startProd = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      successfulDBStart();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const start = async () => {
    switch (environment) {
    case 'development':
      await startDev();
      break;
    case 'release':
      await startRelease();
      break;
    case 'cache':
      await startCache();
      break;
    case 'testing':
      await startTest();
      break;
    case 'production':
      await startProd();
      break;
    default:
      await wrongEnvironment();
    }
  };

  return {
    start,
  };
};

module.exports = dbService;
