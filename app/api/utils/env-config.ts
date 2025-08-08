const _config = {
  mongoDb: process.env.MONGODB_URI,
  dbName: process.env.DATABASE,
  saltRounds: parseInt(process.env.SALT_ROUNDS || '10', 10),
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  llmApiKey: process.env.FINANCIAL_LLM_API_KEY,
  llmModel: process.env.FINANCIAL_LLM_MODEL,
};
export const config = Object.freeze(_config);
