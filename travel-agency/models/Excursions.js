module.exports = (sequelize, DataTypes) => {
    const Excursions = sequelize.define('Excursions', {
        excursion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        excursion_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        start_datetime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.NUMERIC(10, 2),
            allowNull: false,
        },
        max_participants: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'excursions',
        timestamps: false,
    });

    Excursions.associate = (models) => {
        Excursions.hasMany(models.Booking_Items, { foreignKey: 'excursion_id' });
    };

    return Excursions;
};
