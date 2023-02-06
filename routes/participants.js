// TODO: all the basic crud operations are here. Some might not be entirely applicable. So might want to delete some of them.
const { models } = require('../models');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const participants = await models.participant.findAll();
	res.status(200).json(participants);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const participant = await models.participant.findByPk(id);
	if (participant) {
		res.status(200).json(participant);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		createdParticipant = await models.participant.create(req.body);
		res.status(201).send(createdParticipant);
	}
};

async function update(req, res) {
	const id = getIdParam(req);

	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		await models.participant.update(req.body, {
			where: {
				id: id
			}
		});
		res.status(200).end();
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function remove(req, res) {
	const id = getIdParam(req);
	await models.participant.destroy({
		where: {
			id: id
		}
	});
	res.status(200).end();
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};