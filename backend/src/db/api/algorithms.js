const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AlgorithmsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const algorithms = await db.algorithms.create(
      {
        id: data.id || undefined,

        algorithm_name: data.algorithm_name || null,
        description: data.description || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await algorithms.setTeams(data.teams || [], {
      transaction,
    });

    await algorithms.setUsers(data.users || [], {
      transaction,
    });

    return algorithms;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const algorithms = await db.algorithms.findByPk(id, {
      transaction,
    });

    await algorithms.update(
      {
        algorithm_name: data.algorithm_name || null,
        description: data.description || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await algorithms.setTeams(data.teams || [], {
      transaction,
    });

    await algorithms.setUsers(data.users || [], {
      transaction,
    });

    return algorithms;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const algorithms = await db.algorithms.findByPk(id, options);

    await algorithms.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await algorithms.destroy({
      transaction,
    });

    return algorithms;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const algorithms = await db.algorithms.findOne({ where }, { transaction });

    if (!algorithms) {
      return algorithms;
    }

    const output = algorithms.get({ plain: true });

    output.teams = await algorithms.getTeams({
      transaction,
    });

    output.users = await algorithms.getUsers({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.teams,
        as: 'teams',
        through: filter.teams
          ? {
              where: {
                [Op.or]: filter.teams.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.teams ? true : null,
      },

      {
        model: db.users,
        as: 'users',
        through: filter.users
          ? {
              where: {
                [Op.or]: filter.users.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.users ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.algorithm_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'algorithms',
            'algorithm_name',
            filter.algorithm_name,
          ),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'algorithms',
            'description',
            filter.description,
          ),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.algorithms.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.algorithms.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('algorithms', 'id', query),
        ],
      };
    }

    const records = await db.algorithms.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};
