import { rate, Rating } from 'ts-trueskill';

import {getIdParam} from '../helpers.js';
import {sequelize} from '../models/index.js';

const models = sequelize.models;

async function getByEvent(req, res) {
	const id = getIdParam(req);
	const participants = await models.participant.findAll(
		{
			where: {
				eventId: id
			}
		}
	);

	res.status(200).json(participants);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const participant = await models.participant.findByPk(id);
	if (participant) {
		res.status(200).json(participant);
	} else {
		res.status(404).send(`Participant with id ${id} was not found`);
	}
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		const defaultRating = new Rating();

		// TODO: Perhaps we want to check eventId exists? Currently, it gives internal server error...
		const createdParticipant = await models.participant.create({
			eventId: req.body.eventId,
			ratingMu: defaultRating.mu,
			ratingSigma: defaultRating.sigma
		});
		res.status(201).send(createdParticipant);
	}
};

async function remove(req, res) {
	// TODO: What are the consequences of deleting a participant?
	// e.g. what happens if we have a matchlog with a participant who later gets deleted. When a matchlog is updated and
	// rating is recalculated from the ground up, it could potentially cause issues!
	const id = getIdParam(req);
	const dbResponse = await models.participant.destroy({
		where: {
			id: id
		}
	});

	if(dbResponse > 0){
		res.status(200).end();
	}
	else{
		res.status(404).send(`Participant with id ${id} was not found`);
	}	
};

export {
	getByEvent,
	getById,
	create,
	remove,
};