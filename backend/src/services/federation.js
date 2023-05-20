const db = require('../db/models');
const FederationDBApi = require('../db/api/federation');

module.exports = class FederationService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await FederationDBApi.create(data, {
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
      let federation = await FederationDBApi.findBy({ id }, { transaction });

      if (!federation) {
        throw new ValidationError('federationNotFound');
      }

      await FederationDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return federation;
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

      await FederationDBApi.remove(id, {
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
