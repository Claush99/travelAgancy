module.exports = (sequelize, DataTypes) => {
    const Bookings = sequelize.define('Bookings', {
        booking_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        booking_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        check_in_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        check_out_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        adults: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        children: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'bookings',
        timestamps: false,
    });

    Bookings.associate = (models) => {
        Bookings.belongsTo(models.Customers, { foreignKey: 'customer_id' });
        Bookings.hasMany(models.Booking_Items, { foreignKey: 'booking_id' });
    };

    return Bookings;
};
