module.exports = (sequelize, DataTypes) => {
    const Hotels = sequelize.define('Hotels', {
        hotel_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hotel_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        star_rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        amenities: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
    }, {
        tableName: 'hotels',
        timestamps: false,
    });

    Hotels.associate = (models) => {
        Hotels.hasMany(models.Booking_Items, { foreignKey: 'hotel_id' });
    };

    return Hotels;
};
