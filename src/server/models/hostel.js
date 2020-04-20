module.exports = (sequelize, DataTypes) => {
  const Hostel = sequelize.define(
    'hostel',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false
      },
      affiliation: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  Hostel.associate = models => {
    Hostel.hasMany(models.user);
  };

  return Hostel;
};
