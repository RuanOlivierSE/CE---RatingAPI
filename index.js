const app = require('./app');
const sequelize = require('./models/index');
const PORT = 8080;
const swaggerUi = require('swagger-ui-express');
const apiDocumentation = require('./docs/apidoc.js');

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
	await assertDatabaseConnectionOk();

	app.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}. Try some routes, such as '/events'.`);
	});

	// OpenAPI UI

	temp = apiDocumentation.apiDocumentation;
	console.log(temp);
	app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(apiDocumentation.apiDocumentation));
}

init();