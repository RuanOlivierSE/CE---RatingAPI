// A helper function to assert the request ID param is valid
// and convert it to a number (since it comes as a string by default)
function getIdParam(req) {
	const id = req.params.id;
	if (/^\d+$/.test(id)) {
		return Number.parseInt(id, 10);
	}
	throw new TypeError(`Invalid ':id' param: "${id}"`);
}

async function validateMatchlogBody(body){
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
export { getIdParam, validateMatchlogBody };
