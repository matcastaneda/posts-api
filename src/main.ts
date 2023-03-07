import app from './app';
import { getConnection } from './lib/mongodb';

const main = async () => {
  await getConnection();
  app.listen(app.get('PORT'));
  console.log('[🚀] Server on port:', app.get('PORT'));
};

main();
