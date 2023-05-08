const db = require('../db/models');
const AlgorithmsDBApi = require('../db/api/algorithms');

module.exports = class AlgorithmsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await AlgorithmsDBApi.create(
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let algorithms = await AlgorithmsDBApi.findBy(
        {id},
        {transaction},
      );

      if (!algorithms) {
        throw new ValidationError(
          'algorithmsNotFound',
        );
      }

      await AlgorithmsDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return algorithms;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError(
          'errors.forbidden.message',
        );
      }

      await AlgorithmsDBApi.remove(
        id,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

