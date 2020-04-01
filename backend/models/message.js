module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define('Message', {
        message: DataTypes.TEXT,
        userId: DataTypes.INTEGER,
        roomId: DataTypes.INTEGER
    });

    Messages.associate = function(models) {
        Messages.belongsTo(models.Room, {foreignKey: 'roomId', as: "room"})
        Messages.belongsTo(models.User, {foreignKey: 'userId', as: "user"})
    };

    return Messages;
};