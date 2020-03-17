module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    messages: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    roomId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Room",
        key: "id"
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('messages'),
};