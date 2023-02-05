const { DataTypes } = require('sequelize');
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	return sequelize.define('participant', {
		score: {
			allowNull: false,
            // Not sure if the score will be an int. So rather using a double.
			type: DataTypes.DOUBLE
		}
	},
	{
        paranoid: true
    }
	);
};