import {sequelize} from '../models/index.js';
import {getIdParam, validateMatchlogBody} from '../helpers.js';

const models = sequelize.models;

async function getById(req, res) {
	const id = getIdParam(req);
	const matchlog = await models.matchlog.findByPk(id);
	if (matchlog) {
		res.status(200).json(matchlog);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send('Bad request: ID should not be provided, since it is determined automatically by the database.');
	} else {

		bodyIsValid = await validateMatchlogBody(req.body);
		
		if(bodyIsValid){
		createdMatchlog = await models.matchlog.create(req.body);

		// TODO: Will need to add logic here to calculate the logic
		res.status(201).send(createdMatchlog);
		}
		else{
			res.status(401).send('Bad request: Body is invalid.');
		}
	}
};

async function update(req, res) {
	const id = getIdParam(req);
	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		await models.matchlog.update(req.body, {
			where: {
				id: id
			}
		});

		// TODO: Will need to add logic here to rerun the rating calculation from the ground up.
		res.status(200).end();
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function remove(req, res) {
	const id = getIdParam(req);
	await models.matchlog.destroy({
		where: {
			id: id
		}
	});
	res.status(200).end();
};

export {
	getById,
	create,
	update,
	remove,
};