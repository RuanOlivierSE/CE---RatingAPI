import {sequelize} from '../models/index.js';
import {getIdParam} from '../helpers.js';

const models = sequelize.models;

async function getAll(req, res) {
	const events = await models.event.findAll();
	res.status(200).json(events);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const event = await models.event.findByPk(id, {include: models.participant});
	if (event) {
		res.status(200).json(event);
	} else {
		res.status(404).send(`Event with id ${id} was not found`);
	}
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		const createdEvent = await models.event.create(req.body);
		res.status(201).send(createdEvent);
	}
};

async function update(req, res) {
	const id = getIdParam(req);

	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		const dbResponse = await models.event.update(req.body, {
			where: {
				id: id
			},
			returning: true,
			raw: true
		});
		// the first entry in the db response is the number of affected rows.
		if(dbResponse[0] > 0){
			// the second entry in the db response is an array of the affected rows.
			// making the assumption that this will only be 1, since the WHERE is on a PK.
			res.status(200).send(dbResponse[1][0]);
		}
		else{
			res.status(404).send(`Event with id ${id} was not found`);
		}
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function remove(req, res) {
	const id = getIdParam(req);

	// the dbResponse will be the number of rows deleted.
	const dbResponse = await models.event.destroy({
		where: {
			id: id
		}
	});

	if(dbResponse > 0){
		res.status(201).end();
	}
	else{
		res.status(404).send(`Event with id ${id} was not found`);
	}	
};

export {
	getAll,
	getById,
	create,
	update,
	remove,
};