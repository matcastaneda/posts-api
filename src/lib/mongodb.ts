import { connect, connection } from 'mongoose';
import { MONGO_URI } from '../config';

const getConnection = async () => {
  try {
    await connect(<string>MONGO_URI);
  } catch (error) {
    console.log(`[❌] MongoDB connection failed: ${error}`);
  }
};

connection.on('connected', () => {
  console.log(`[✅] MongoDB successfully connected to the database: [${connection.db.databaseName.toUpperCase()}]`);
});

connection.on('disconnected', () => {
  console.log('[❌] MongoDB disconnected from the database.');
});

export { getConnection };
