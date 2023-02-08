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


async function validateBody(body){
	// Some edge cases to consider:
	// ----------------------------
	// Number of teams should be 2 or more.
	// Each team should have at least 1 participant.
	// Participants need to be linked to the same eventId.
	// Participants need to all be distinct.
	// should probably also check that score is an int

	//do we want teams to all have equal size?

	if(body.teams.length < 2){
		return false;
	}	

	// throw together all the participants into one array.
	participantIds = new Array();
	// removing the shorthand way since this way we get to check team sizes too.
	//body.teams.forEach((x) => { participantIds = participantIds.concat(x.participants); });

	for(let i = 0; i < body.teams.length; i++){
		if(body.teams[i].participants.length == 0)
		{
			return false;
		}
		participantIds = participantIds.concat(body.teams[i].participants);
	}

	// now we just need to make sure that the participants all belong to the same eventId.
	participants = await models.participant.findAll({
		where: {
			id: participantIds,
			eventId: body.eventId
		}
	})

	// means we lost some participants. Either due to not having distinct ones, or since the eventID is wrong
	// might be a good idea to look for duplicates before even doing a read? Though the number of calls should be lowish
	if(participants.length != participantIds.length)
	{
		return false;
	}
	
	// we will probably want to return this list of participants. Just to reduce the number of reads. We already have the info :)
	return true;
}


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

		bodyIsValid = await validateBody(req.body);
		
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

module.exports = {
	getById,
	create,
	update,
	remove,
};