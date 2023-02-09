import swaggerUi from 'swagger-ui-express';
import { app } from './app.js';
import { sequelize } from './models/index.js';
import {apiDocumentation} from './docs/apidoc.js';

const PORT = 8080;

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
	app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(apiDocumentation));
}

init();

// TODO: currently, the deletes & updates don't give an error if that row doesn't exist
// TODO: currently the updates do not return the updated item [Antin said we must do it :)]. This could be fine, but then you need to update the docs -- they indicate that the obj is returned.
// TODO: check that the response codes coincide in code and the openapi documentation
// TODO: Don't forget to add documentation for the "getAllParticipantsByEventID"
// TODO: Confirm whether Particpants' ratingMu and ratingSigma will be given with creation... Or if it has defualt values