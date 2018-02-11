module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/thriftyDB'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
