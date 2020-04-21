module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      sid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  User.associate = models => {
    User.belongsTo(models.hostel);
  };

  return User;
};
