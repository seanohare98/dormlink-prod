module.exports = (sequelize, DataTypes) => {
  const Hobby = sequelize.define(
    'hobby',
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  Hobby.associate = models => {
    Hobby.belongsToMany(models.user, {
      through: 'user_hobbies'
    });
  };

  return Hobby;
};
