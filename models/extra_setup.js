function applyExtraSetup(sequelize) {
	const { event, matchlog, participant } = sequelize.models;
console.log(event);
console.log(matchlog);
console.log(participant);
    // setup the the one-to-many relationship between event and participant.
    event.hasMany(participant);
    participant.belongsTo(event);

    // setup the the one-to-many relationship between event and matchlog.
    event.hasMany(matchlog);
    matchlog.belongsTo(event);
}

module.exports = { applyExtraSetup };