// TODO: all the basic crud operations are here. Some might not be entirely applicable. So might want to delete some of them.
// log match

// i imagine the payload should look as follows (open for discussion)

/*
{
    eventId: asd,
    teams: [
        [<participantID1>, <participantID2>, ...],
        [<participantIDx>, <participantIDy>, ...],
        ...
    ],
    scores: [
        7,
        10,
        ...
    ],
    higherIsBetter: true (optional parameter)
}

// things to look for
// need to be able to find the event and the all participants,
// teams.length = scores.length
// scores must all be numeric
// ... all I can think of for now


*/

const { models } = require('../models');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const matchlogs = await models.matchlog.findAll();
	res.status(200).json(matchlogs);
};

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
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		createdMatchlog = await models.matchlog.create(req.body);
		res.status(201).send(createdMatchlog);
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

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};