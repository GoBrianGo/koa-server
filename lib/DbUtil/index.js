const config = process.env.NODE_ENV === 'production' ? require('./config').prod : require('./config').dev
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.database, config.user, config.password, {
	host: config.host,
	dialect: 'mysql',
	operatorsAliases: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	})

sequelize.rawQuery = async(query) => {
	return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
}

// 定义纯查询数据的表model
sequelize.defineTable = (tableName) => {
	return sequelize.define(tableName, {}, {
		timestamps: false,
		freezeTableName: true,
		tableName: tableName
	})
}

module.exports = {
	DbConn: sequelize,
	DbType: Sequelize
}