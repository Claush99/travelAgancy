module.exports = (sequelize, DataTypes) => {
    const Customers = sequelize.define('Customers', {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact_info: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'customers',
        timestamps: false,
    });

    Customers.associate = (models) => {
        Customers.hasMany(models.Bookings, { foreignKey: 'customer_id' });
    };

    return Customers;
};
