import {Sequelize} from 'sequelize';

import {applyExtraSetup} from './extra_setup.js';
import {event} from './event.model.js';
import {matchlog} from './matchlog.model.js';
import {participant} from './participant.model.js';

// Really a bad idea to hardcode the connection detials. But for now, they are hardcoded. #yolo
const sequelize = new Sequelize('CE_MatchRating', 'ruan', 'docker', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  schema: 'public'
});

const modelDefiners = [
	event,
  matchlog,
  participant
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
export {sequelize};