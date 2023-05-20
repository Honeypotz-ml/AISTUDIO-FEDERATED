const db = require('../db/models');
const MonitoringDBApi = require('../db/api/monitoring');

module.exports = class MonitoringService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await MonitoringDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let monitoring = await MonitoringDBApi.findBy({ id }, { transaction });

      if (!monitoring) {
        throw new ValidationError('monitoringNotFound');
      }

      await MonitoringDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return monitoring;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError('errors.forbidden.message');
      }

      await MonitoringDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
