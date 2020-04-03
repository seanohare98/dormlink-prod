module.exports = (sequelize, DataTypes) => {
  const Hostel = sequelize.define(
    'hostel',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
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
