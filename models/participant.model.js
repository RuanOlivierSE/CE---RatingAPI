import { DataTypes } from 'sequelize';
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
function participant(sequelize) {
	return sequelize.define('participant', {
		ratingMu: {
			allowNull: false,
			type: DataTypes.DOUBLE
		},
		ratingSigma: {
			allowNull: false,
			type: DataTypes.DOUBLE
		}
	},
	{
        paranoid: true
    }
	);
};

export { participant }