const db = require('../models');

const Hotels = db.Hotels;

class HotelsController {
  // CREATE (создание отеля)
  async createHotel(req, res) {
    try {
      const {
        hotel_name, address, description, star_rating, amenities,
      } = req.body;
      const newHotel = await Hotels.create({
        hotel_name, address, description, star_rating, amenities,
      });
      res.status(201).json(newHotel);
    } catch (error) {
      console.error('Ошибка при создании отеля:', error);
      res.status(500).json({ error: 'Ошибка при создании отеля' });
    }
  }

  // READ (получение всех отелей)
  async getAllHotels(req, res) {
    try {
      const allHotels = await Hotels.findAll();
      res.json(allHotels);
    } catch (error) {
      console.error('Ошибка при получении всех отелей:', error);
      res.status(500).json({ error: 'Ошибка при получении всех отелей' });
    }
  }

  // READ (получение отеля по идентификатору)
  async getHotelById(req, res) {
    try {
      const hotelId = req.query.id;
      const hotel = await Hotels.findByPk(hotelId);
      if (!hotel) {
        res.status(404).json({ error: 'Отель не найден' });
        return;
      }
      res.json(hotel);
    } catch (error) {
      console.error('Ошибка при получении отеля по идентификатору:', error);
      res.status(500).json({ error: 'Ошибка при получении отеля по идентификатору' });
    }
  }

  // UPDATE (обновление отеля)
  async updateHotel(req, res) {
    try {
      const hotelId = req.query.id;
      const {
        hotel_name, address, description, star_rating, amenities,
      } = req.body;
      const hotel = await Hotels.findByPk(hotelId);
      if (!hotel) {
        res.status(404).json({ error: 'Отель не найден' });
        return;
      }
      await hotel.update({
        hotel_name, address, description, star_rating, amenities,
      });
      res.json(hotel);
    } catch (error) {
      console.error('Ошибка при обновлении отеля:', error);
      res.status(500).json({ error: 'Ошибка при обновлении отеля' });
    }
  }

  // DELETE (удаление отеля)
  async deleteHotel(req, res) {
    try {
      const hotelId = req.query.id;
      const hotel = await Hotels.findByPk(hotelId);
      if (!hotel) {
        res.status(404).json({ error: 'Отель не найден' });
        return;
      }
      await hotel.destroy();
      res.json({ message: 'Отель успешно удален' });
    } catch (error) {
      console.error('Ошибка при удалении отеля:', error);
      res.status(500).json({ error: 'Ошибка при удалении отеля' });
    }
  }
}

module.exports = HotelsController;
