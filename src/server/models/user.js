module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING,
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
      age: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: true
      },
      classStanding: {
        type: DataTypes.ENUM('freshman', 'sophomore', 'junior', 'senior'),
        allowNull: true
      },
      major: {
        type: DataTypes.STRING,
        allowNull: true
      },
      sleepStart: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      sleepEnd: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      cleanliness: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  User.associate = models => {
    User.belongsTo(models.dorm);
    User.belongsToMany(models.hobby, { through: 'user_hobbies' });
  };

  return User;
};
