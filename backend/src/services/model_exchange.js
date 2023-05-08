const db = require('../db/models');
const Model_exchangeDBApi = require('../db/api/model_exchange');

module.exports = class Model_exchangeService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Model_exchangeDBApi.create(
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
      let model_exchange = await Model_exchangeDBApi.findBy(
        {id},
        {transaction},
      );

      if (!model_exchange) {
        throw new ValidationError(
          'model_exchangeNotFound',
        );
      }

      await Model_exchangeDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return model_exchange;

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

      await Model_exchangeDBApi.remove(
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

