/**
 * Config sql database
 */
export default {
	localhost: {
		default: {
			// host:  '127.0.0.1',
			// port: process.env.MYSQL_PORT || '3306',
			// username: process.env.MYSQL_USERNAME || 'root',
			// password: process.env.MYSQL_PASSWORD || '123456',
			// database: process.env.MYSQL_DB || 'web_cuuvan',
			// dialect: 'mysql',
			// logging: true,
			// pool: { max: 10, min: 0, idle: 1000}

			host:  '127.0.0.1',
			port:  '3306',
			username:  'root',
			password:  '123456',
			database: 'web_cuuvan',
			dialect: 'mysql',
			logging: true,
			pool: { max: 10, min: 0, idle: 1000}
		}
	},
	production: {
		default: {
			host: process.env.MYSQL_HOST || 'localhost',
			port: process.env.MYSQL_PORT || '3306',
			username: process.env.MYSQL_USERNAME || 'db_web_cuuvan',
			password: process.env.MYSQL_PASSWORD || 'ybUeFIbU5RMNWF36hcJE',
			database: process.env.MYSQL_DB || 'db_web_cuuvan',
			dialect: 'mysql',
			logging: true,
			pool: { max: 10, min: 0, idle: 1000}
		}
	},
};