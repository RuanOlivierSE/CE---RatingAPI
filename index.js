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
	app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(apiDocumentation.apiDocumentation));
}

init();

// TODO: currently, the deletes & updates don't give an error if that row doesn't exist
// TODO: currently the updates do not return the updated item. This could be fine, but then you need to update the docs -- they indicate that the obj is returned.
// TODO: check that the response codes coincide in code and the openapi documentation
// TODO: Don't forget to add documentation for the "getAllParticipantsByEventID"