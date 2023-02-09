import { DataTypes } from 'sequelize';
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
function event(sequelize) {
	return sequelize.define('event', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
    {
        paranoid: true
    }
    );
};

export {event}