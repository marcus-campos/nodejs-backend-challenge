module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        message: DataTypes.TEXT,

    });

    Message.associate = function(models) {
        Message.belongsTo(models.Room, {foreignKey: 'roomId', as: 'room'})
        Message.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
    };

    return Message;
};