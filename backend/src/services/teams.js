const db = require('../db/models');
const TeamsDBApi = require('../db/api/teams');

module.exports = class TeamsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await TeamsDBApi.create(
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
      let teams = await TeamsDBApi.findBy(
        {id},
        {transaction},
      );

      if (!teams) {
        throw new ValidationError(
          'teamsNotFound',
        );
      }

      await TeamsDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return teams;

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

      await TeamsDBApi.remove(
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

