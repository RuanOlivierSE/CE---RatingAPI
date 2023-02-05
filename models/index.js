const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra_setup');

// Really a bad idea to hardcode the connection detials. But for now, they are hardcoded. #yolo
const sequelize = new Sequelize('CE_MatchRating', 'ruan', 'docker', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  schema: 'public'
});

const modelDefiners = [
	require('./event.model'),
  require('./matchlog.model'),
	require('./participant.model'),	
	// Add more models here if required...
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

sequelize.sync({ alter: true })
.then(() => { console.log("synced db.");}).catch((err) => {console.log("failed to sync db: " + err.message);});

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;