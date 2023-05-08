const db = require('../db/models');
const TrainingDBApi = require('../db/api/training');

module.exports = class TrainingService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await TrainingDBApi.create(
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
      let training = await TrainingDBApi.findBy(
        {id},
        {transaction},
      );

      if (!training) {
        throw new ValidationError(
          'trainingNotFound',
        );
      }

      await TrainingDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return training;

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

      await TrainingDBApi.remove(
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

