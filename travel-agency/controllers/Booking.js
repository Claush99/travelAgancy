const db = require('../models');
const sequelize = require('sequelize');
const { Op } = require('sequelize');

const Booking = db.Bookings;
const Customers = db.Customers;
const Booking_Items = db.Booking_Items;
const Hotels = db.Hotels;
const Excursions = db.Excursions;

class BookingController {
  // CREATE (создание бронирования)
  async createBooking(req, res) {
    try {
      const {
        customer_id, booking_date, check_in_date, check_out_date, adults, children,
      } = req.body;
      const newBooking = await Booking.create({
        customer_id, booking_date, check_in_date, check_out_date, adults, children,
      });
      res.status(201).json(newBooking);
    } catch (error) {
      console.error('Ошибка при создании бронирования:', error);
      res.status(500).json({ error: 'Ошибка при создании бронирования' });
    }
  }

  // READ (получение всех бронирований)
  async getAllBookings(req, res) {
    try {
      const allBookings = await Booking.findAll();
      res.json(allBookings);
    } catch (error) {
      console.error('Ошибка при получении всех бронирований:', error);
      res.status(500).json({ error: 'Ошибка при получении всех бронирований' });
    }
  }

  // READ (получение бронирования по идентификатору)
  async getBookingById(req, res) {
    try {
      const bookingId = req.query.id;
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        res.status(404).json({ error: 'Бронирование не найдено' });
        return;
      }
      res.json(booking);
    } catch (error) {
      console.error('Ошибка при получении бронирования по идентификатору:', error);
      res.status(500).json({ error: 'Ошибка при получении бронирования по идентификатору' });
    }
  }

  // UPDATE (обновление бронирования)
  async updateBooking(req, res) {
    try {
      const bookingId = req.query.id;
      const {
        customer_id, booking_date, check_in_date, check_out_date, adults, children,
      } = req.body;
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        res.status(404).json({ error: 'Бронирование не найдено' });
        return;
      }
      await booking.update({
        customer_id, booking_date, check_in_date, check_out_date, adults, children,
      });
      res.json(booking);
    } catch (error) {
      console.error('Ошибка при обновлении бронирования:', error);
      res.status(500).json({ error: 'Ошибка при обновлении бронирования' });
    }
  }

  // DELETE (удаление бронирования)
  async deleteBooking(req, res) {
    try {
      const bookingId = req.query.id;
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        res.status(404).json({ error: 'Бронирование не найдено' });
        return;
      }
      await booking.destroy();
      res.json({ message: 'Бронирование успешно удалено' });
    } catch (error) {
      console.error('Ошибка при удалении бронирования:', error);
      res.status(500).json({ error: 'Ошибка при удалении бронирования' });
    }
  }

  async getBookingDetails(req, res) {
    try {
      const bookingId = req.query.bookingId; // Получаем идентификатор бронирования из параметра маршрута

      // Находим бронирование по идентификатору и включаем связанные данные о клиенте и отеле/экскурсии
      const bookingDetails = await Booking.findByPk(bookingId, {
        include: [
          { model: Customers }, // Связь с моделью клиентов
          {
            model: Booking_Items,
            include: [
              { model: Hotels }, // Связь с моделью отелей
              { model: Excursions }, // Связь с моделью экскурсий
            ],
          },
        ],
      });

      if (!bookingDetails) {
        res.status(404).json({ error: 'Бронирование не найдено' });
        return;
      }

      res.json(bookingDetails); // Отправляем данные о бронировании и связанных моделях
    } catch (error) {
      console.error('Ошибка при получении информации о бронировании:', error);
      res.status(500).json({ error: 'Ошибка при получении информации о бронировании' });
    }
  }

  async countBookingsByMonth(req, res) {
    try {
      const { year, month } = req.query;

      const startDate = new Date(year, month - 1, 1); // Создаем объект Date для начала месяца
      const endDate = new Date(year, month, 0); // Создаем объект Date для конца месяца

      const bookingsCount = await Booking.count({
        where: {
          booking_date: {
            [Op.between]: [startDate, endDate] // Используем оператор between для поиска бронирований в диапазоне дат
          }
        }
      });

      res.json({ count: bookingsCount });
    } catch (error) {
      console.error('Ошибка при подсчете заказов за месяц:', error);
      res.status(500).json({ error: 'Ошибка при подсчете заказов за месяц' });
    }
  }
}

module.exports = BookingController;
