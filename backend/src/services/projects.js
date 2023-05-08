const db = require('../db/models');
const ProjectsDBApi = require('../db/api/projects');

module.exports = class ProjectsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await ProjectsDBApi.create(data, {
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
      let projects = await ProjectsDBApi.findBy({ id }, { transaction });

      if (!projects) {
        throw new ValidationError('projectsNotFound');
      }

      await ProjectsDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return projects;
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

      await ProjectsDBApi.remove(id, {
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
