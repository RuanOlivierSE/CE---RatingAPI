import {rate, Rating} from 'ts-trueskill';
import {sequelize} from '../models/index.js';

async function rateTeams(requestTeams, dbParticipants, higherIsBetter = true) {

    // this sort constant just allows us to essentially say "ascending" or "descending".
    const sortConstant = higherIsBetter ? 1 : -1;

    // we sort the teams on their score
	requestTeams.sort((x, y) => (parseFloat(y.score) - parseFloat(x.score)) * sortConstant);

    var previousScore = higherIsBetter ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER;
    var previousPos = 0;

    var teams = new Array();
    var ranks = new Array();

    // iterate over the array of teams
    for(let i = 0; i < requestTeams.length; i++){
        // check the score and determine if their position is the same as the previous team's
        if(previousScore == parseFloat(requestTeams[i].score)){
            ranks.push(previousPos);
        }
        else{
            previousScore = parseFloat(requestTeams[i].score)
            ranks.push(i);
            previousPos = i;
        }

        // We iterate over the participants in the current team, getting their ratings and then adding it to an array.
        var participants = requestTeams[i].participants;
        var ratings = new Array();
        for(let j = 0; j < participants.length; j++){
            var curParticipant = dbParticipants.find(x => {
                return x.id === participants[j];
              })
            var rating = new Rating(curParticipant.ratingMu, curParticipant.ratingSigma);
            // might want to add id to the rating to simplify the work when we later save to the db.

            rating.participantId = curParticipant.id;
            ratings.push(rating);
        }
        teams.push(ratings);
    }
    
    // Now we can finally calculate the rating updates
    const updatedTeams = rate(teams, ranks)
    console.log(updatedTeams);
    console.table(ranks);

    for(let i = 0; i < updatedTeams.length; i++){
        var curTeam = updatedTeams[i];

        for(let j = 0; j < curTeam.length; j++){

            var curRating = curTeam[j];
            await sequelize.models.participant.update({
                ratingMu: curRating.mu,
                ratingSigma: curRating.sigma
            }, 
            {
                where: {
                    id: teams[i][j].participantId,
                },
            });
        }
    }

}

export {rateTeams}