import {sequelize} from '../models/index.js';
import {getIdParam, hasDuplicates} from '../helpers.js';
import {rateTeams} from '../rating/index.js';

const models = sequelize.models;

async function getById(req, res) {
	const id = getIdParam(req);
	const matchlog = await models.matchlog.findByPk(id);
	if (matchlog) {
		res.status(200).json(matchlog);
	} else {
		res.status(404).send(`Matchlog with id ${id} was not found`);
	}
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send('Bad request: ID should not be provided, since it is determined automatically by the database.');
	} else {
		try {
			// validate the request body.
			var participants = await validateMatchlogBody(req.body);
			// save the matchlog to the db
			var createdMatchlog = await models.matchlog.create(req.body);
			// calculate the team ratings and update the relevant participants.
			rateTeams(req.body.teams, participants, req.body.higherIsBetter);
			
			res.status(201).send(createdMatchlog);
		} catch (error) {
			res.status(400).send(error.message);

		}
	}
};

async function update(req, res) {
	const id = getIdParam(req);
	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		try {
			var participants = await validateMatchlogBody(req.body);
		} catch (error) {
			res.status(400).send(error.message);
			// the body isn't valid, so just stop this method.
			return;
		}
		
		const dbResponse = await models.matchlog.update(req.body, {
			where: {
				id: id
			},
			returning: true,
			raw: true
		});

		// the first entry in the db response is the number of affected rows.
		if (dbResponse[0] > 0) {
			// the second entry in the db response is an array of the affected rows.
			// making the assumption that this will only be 1, since the WHERE is on a PK.

			// TODO: Will need to add logic here to rerun the rating calculation from the ground up.
			res.status(200).send(dbResponse[1][0]);
		}
		else {
			res.status(404).send(`Matchlog with id ${id} was not found`);
		}

	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function remove(req, res) {
	const id = getIdParam(req);

	// the dbResponse will be the number of rows deleted.
	const dbResponse = await models.matchlog.destroy({
		where: {
			id: id
		}
	});

	if(dbResponse > 0){
		res.status(200).end();
	}
	else{
		res.status(404).send(`Matchlog with id ${id} was not found`);
	}	
};

async function validateMatchlogBody(body) {
	// TODO: check that the event isn't deleted in the DB!
	// TODO: check that the score is an int... Maybe also check that it is > 0?

	// Number of teams should be 2 or more.
	if (body.teams.length < 2) {
		throw new Error('Number of teams should be 2 or more');
	}

	// Throw together all the participants into one array.
	var participantIds = new Array();

	// removing the shorthand way since this way we get to check team sizes too.
	//body.teams.forEach((x) => { participantIds = participantIds.concat(x.participants); });

	for (let i = 0; i < body.teams.length; i++) {
		// Each team should have at least 1 participant.
		if (body.teams[i].participants.length == 0) {
			throw new Error('Each team should have at least 1 participant.');
		}

		participantIds = participantIds.concat(body.teams[i].participants);
	}

	// Next, we check that all participants are distinct
	if (hasDuplicates(participantIds)) {
		throw new Error('All participants must be distinct.');
	}

	// Finally, we read the participants from the db
	var participants = await models.participant.findAll({
		where: {
			id: participantIds,
			eventId: body.eventId
		}
	});

	// Lastly, we just need to make sure that the participants all belonged to the same event
	if (participants.length != participantIds.length) {
		// means we lost some participants. Either since one of the participants weren't in the db or because their eventId was wrong
		throw new Error('Number of participants returned from db is lower than anticipated. Check that all participants are present in the db and linked to the correct event');
	}

	// Now that we did all the checks, we can just return the list of participants, as we will adjust their ratings now.
	return participants;
}

export {
	getById,
	create,
	update,
	remove,
};