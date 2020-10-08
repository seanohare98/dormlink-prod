module.exports = (sequelize, DataTypes) => {
  const Dorm = sequelize.define(
    'dorm',
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false
      },
      neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  Dorm.associate = models => {
    Dorm.hasMany(models.user);
  };

  return Dorm;
};
