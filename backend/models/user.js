module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('User', {
        name: DataTypes.STRING,
        nick: {
            type: DataTypes.STRING,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        birth: DataTypes.DATEONLY
    });

    Users.associate = function(models) {
        Users.hasMany(models.Message, {foreignKey: 'id', as: 'messages'})
    };

    return Users;
};