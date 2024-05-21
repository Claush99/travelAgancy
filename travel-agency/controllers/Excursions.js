const db = require('../models');
const Excursions = db.Excursions;

class ExcursionsController {
    // CREATE (создание экскурсии)
    async createExcursion(req, res) {
        try {
            const { excursion_name, location, start_datetime, duration, price, max_participants } = req.body;
            const newExcursion = await Excursions.create({ excursion_name, location, start_datetime, duration, price, max_participants });
            res.status(201).json(newExcursion);
        } catch (error) {
            console.error('Ошибка при создании экскурсии:', error);
            res.status(500).json({ error: 'Ошибка при создании экскурсии' });
        }
    }

    // READ (получение всех экскурсий)
    async getAllExcursions(req, res) {
        try {
            const allExcursions = await Excursions.findAll();
            res.json(allExcursions);
        } catch (error) {
            console.error('Ошибка при получении всех экскурсий:', error);
            res.status(500).json({ error: 'Ошибка при получении всех экскурсий' });
        }
    }

    // READ (получение экскурсии по идентификатору)
    async getExcursionById(req, res) {
        try {
            const excursionId = req.query.id;
            const excursion = await Excursions.findByPk(excursionId);
            if (!excursion) {
                res.status(404).json({ error: 'Экскурсия не найдена' });
                return;
            }
            res.json(excursion);
        } catch (error) {
            console.error('Ошибка при получении экскурсии по идентификатору:', error);
            res.status(500).json({ error: 'Ошибка при получении экскурсии по идентификатору' });
        }
    }

    // UPDATE (обновление экскурсии)
    async updateExcursion(req, res) {
        try {
            const excursionId = req.query.id;
            const { excursion_name, location, start_datetime, duration, price, max_participants } = req.body;
            const excursion = await Excursions.findByPk(excursionId);
            if (!excursion) {
                res.status(404).json({ error: 'Экскурсия не найдена' });
                return;
            }
            await excursion.update({ excursion_name, location, start_datetime, duration, price, max_participants });
            res.json(excursion);
        } catch (error) {
            console.error('Ошибка при обновлении экскурсии:', error);
            res.status(500).json({ error: 'Ошибка при обновлении экскурсии' });
        }
    }

    // DELETE (удаление экскурсии)
    async deleteExcursion(req, res) {
        try {
            const excursionId = req.query.id;
            const excursion = await Excursions.findByPk(excursionId);
            if (!excursion) {
                res.status(404).json({ error: 'Экскурсия не найдена' });
                return;
            }
            await excursion.destroy();
            res.json({ message: 'Экскурсия успешно удалена' });
        } catch (error) {
            console.error('Ошибка при удалении экскурсии:', error);
            res.status(500).json({ error: 'Ошибка при удалении экскурсии' });
        }
    }
}

module.exports = ExcursionsController;
