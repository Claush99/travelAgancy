module.exports = (sequelize, DataTypes) => {
  const Booking_Items = sequelize.define('Booking_Items', {
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },
    excursion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },
  }, {
    tableName: 'booking_items',
    timestamps: false,
    primaryKey: ['booking_id', 'hotel_id', 'excursion_id'],
  });
  Booking_Items.associate = (models) => {
    Booking_Items.belongsTo(models.Bookings, { foreignKey: 'booking_id' });
    Booking_Items.belongsTo(models.Hotels, { foreignKey: 'hotel_id' });
    Booking_Items.belongsTo(models.Excursions, { foreignKey: 'excursion_id' });
  };
  return Booking_Items;
};
