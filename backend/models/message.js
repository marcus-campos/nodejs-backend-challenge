module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define('Message', {
        message: DataTypes.TEXT,
        userId: DataTypes.INTEGER,
        roomId: DataTypes.INTEGER
    });

    Messages.associate = function(models) {
        Messages.hasOne(models.Room, {foreignKey: 'id', as: 'room'})
        Messages.hasOne(models.User, {foreignKey: 'id', as: 'user'})
    };

    return Messages;
};