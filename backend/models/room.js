module.exports = (sequelize, DataTypes) => {
    const Rooms = sequelize.define('Room', {
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    });

    return Rooms;
};