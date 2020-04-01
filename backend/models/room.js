module.exports = (sequelize, DataTypes) => {
    const Rooms = sequelize.define('Room', {
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    });

    Rooms.associate = function(models) {
        Rooms.hasMany(models.Message)
    };

    return Rooms;
};