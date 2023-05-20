const db = require('../db/models');
const DeploymentDBApi = require('../db/api/deployment');

module.exports = class DeploymentService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await DeploymentDBApi.create(data, {
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
      let deployment = await DeploymentDBApi.findBy({ id }, { transaction });

      if (!deployment) {
        throw new ValidationError('deploymentNotFound');
      }

      await DeploymentDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return deployment;
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

      await DeploymentDBApi.remove(id, {
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
