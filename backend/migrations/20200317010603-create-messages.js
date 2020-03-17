module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    message: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    roomId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Rooms",
        key: "id"
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('messages'),
};