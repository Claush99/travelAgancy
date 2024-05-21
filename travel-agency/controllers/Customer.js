const db = require('../models');
const Customers = db.Customers;

class CustomersController {
    // CREATE (создание клиента)
    async createCustomer(req, res) {
        try {
            const { first_name, last_name, contact_info } = req.body;
            const newCustomer = await Customers.create({ first_name, last_name, contact_info });
            res.status(201).json(newCustomer);
        } catch (error) {
            console.error('Ошибка при создании клиента:', error);
            res.status(500).json({ error: 'Ошибка при создании клиента' });
        }
    }

    // READ (получение всех клиентов)
    async getAllCustomers(req, res) {
        try {
            const allCustomers = await Customers.findAll();
            res.json(allCustomers);
        } catch (error) {
            console.error('Ошибка при получении всех клиентов:', error);
            res.status(500).json({ error: 'Ошибка при получении всех клиентов' });
        }
    }

    // READ (получение клиента по идентификатору)
    async getCustomerById(req, res) {
        try {
            const customerId = req.query.id;
            const customer = await Customers.findByPk(customerId);
            if (!customer) {
                res.status(404).json({ error: 'Клиент не найден' });
                return;
            }
            res.json(customer);
        } catch (error) {
            console.error('Ошибка при получении клиента по идентификатору:', error);
            res.status(500).json({ error: 'Ошибка при получении клиента по идентификатору' });
        }
    }

    // UPDATE (обновление клиента)
    async updateCustomer(req, res) {
        try {
            const customerId = req.query.id;
            const { first_name, last_name, contact_info } = req.body;
            const customer = await Customers.findByPk(customerId);
            if (!customer) {
                res.status(404).json({ error: 'Клиент не найден' });
                return;
            }
            await customer.update({ first_name, last_name, contact_info });
            res.json(customer);
        } catch (error) {
            console.error('Ошибка при обновлении клиента:', error);
            res.status(500).json({ error: 'Ошибка при обновлении клиента' });
        }
    }

    // DELETE (удаление клиента)
    async deleteCustomer(req, res) {
        try {
            const customerId = req.query.id;
            const customer = await Customers.findByPk(customerId);
            if (!customer) {
                res.status(404).json({ error: 'Клиент не найден' });
                return;
            }
            await customer.destroy();
            res.json({ message: 'Клиент успешно удален' });
        } catch (error) {
            console.error('Ошибка при удалении клиента:', error);
            res.status(500).json({ error: 'Ошибка при удалении клиента' });
        }
    }
}

module.exports = CustomersController;
