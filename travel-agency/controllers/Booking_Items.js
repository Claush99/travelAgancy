const db = require('../models');
const Booking_Items = db.Booking_Items;

class BookingItemsController {
    // CREATE (добавление связи между бронированием и отелем/экскурсией)
    async addBookingItem(req, res) {
        try {
            //const { booking_id, hotel_id, excursion_id } = req.body;
            const booking_id = req.body.booking_id;
            const hotel_id = req.body.hotel_id;
            const excursion_id = req.body.excursion_id;
            const newBookingItem = await Booking_Items.create({ booking_id, hotel_id, excursion_id });
            res.status(201).json(newBookingItem);
        } catch (error) {
            console.error('Ошибка при добавлении связи бронирования и отеля/экскурсии:', error);
            res.status(500).json({ error: 'Ошибка при добавлении связи бронирования и отеля/экскурсии' });
        }
    }

    // READ (получение связей для определенного бронирования)
    async getBookingItemsByBookingId(req, res) {
        try {
            const booking_id = req.query.booking_id;
            const bookingItems = await Booking_Items.findAll({ where: { booking_id } });
            res.json(bookingItems);
        } catch (error) {
            console.error('Ошибка при получении связей для определенного бронирования:', error);
            res.status(500).json({ error: 'Ошибка при получении связей для определенного бронирования' });
        }
    }

    async removeBookingItem(req, res) {
        try {
            const { bookingId, hotelId, excursionId } = req.query; // Получаем значения компонентов составного ключа из параметров маршрута
            const bookingItem = await Booking_Items.findOne({ where: { booking_id: bookingId, hotel_id: hotelId, excursion_id: excursionId } });
            if (!bookingItem) {
                res.status(404).json({ error: 'Связь бронирования и отеля/экскурсии не найдена' });
                return;
            }
            await bookingItem.destroy(); //удаление связи из БД 
            res.json({ message: 'Связь успешно удалена' });
        } catch (error) {
            console.error('Ошибка при удалении связи бронирования и отеля/экскурсии:', error);
            res.status(500).json({ error: 'Ошибка при удалении связи бронирования и отеля/экскурсии' });
        }
    }

}

module.exports = BookingItemsController;
