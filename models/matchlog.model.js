const { DataTypes } = require('sequelize');
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	return sequelize.define('matchlog', {
		teams: {
            // This is the request body. Named the variable teams to simplify conversion 
            // between JSON and model. It will contain an array. Each entry represents a team.
            // A team has a score and an array of its participants
            type: DataTypes.JSONB,
            // could also use JSONB if we want to do any operations on the data inside the col.
            // e.g. if we want to lookup based on one of the values inside the col.
    },
        higherIsBetter: {
            // This represents whether a higher score is better than a lower score.
            // An example of when this could be false: scores in golf.
            // Or when socre is like a rank, e.g. position 1 is better than position 2.
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
	},
	{
        paranoid: true
    }
	);
};