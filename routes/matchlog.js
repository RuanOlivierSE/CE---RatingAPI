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