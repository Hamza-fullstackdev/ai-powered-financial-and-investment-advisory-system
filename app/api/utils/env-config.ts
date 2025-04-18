const _config = {
  mongoDb: process.env.MONGODB_URI,
  dbName: process.env.DATABASE,
  saltRounds: parseInt(process.env.SALT_ROUNDS || '10', 10),
  jwtSecretKey: process.env.JWT_SECRET_KEY,
};
export const config = Object.freeze(_config);
