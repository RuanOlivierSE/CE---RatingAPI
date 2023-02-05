const { DataTypes } = require('sequelize');
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	return sequelize.define('event', {
		name: {
			type: DataTypes.STRING
		}
	},
    {
        paranoid: true
    }
    );
};