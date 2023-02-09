function applyExtraSetup(sequelize) {
    const { event, matchlog, participant } = sequelize.models;
    // setup the the one-to-many relationship between event and participant.
    event.hasMany(participant, { 
        foreignKey: { 
            allowNull: false 
        }
    });
    participant.belongsTo(event);

    // setup the the one-to-many relationship between event and matchlog.
    event.hasMany(matchlog, { 
        foreignKey: { 
            allowNull: false 
        }
    });
    matchlog.belongsTo(event);
}

export { applyExtraSetup };