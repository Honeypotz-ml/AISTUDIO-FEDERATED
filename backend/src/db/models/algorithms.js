const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const algorithms = sequelize.define(
    'algorithms',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

algorithm_name: {
        type: DataTypes.TEXT,

      },

description: {
        type: DataTypes.TEXT,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  algorithms.associate = (db) => {

    db.algorithms.belongsToMany(db.teams, {
      as: 'teams',
      foreignKey: {
        name: 'algorithms_teamsId',
      },
      constraints: false,
      through: 'algorithmsTeamsTeams',
    });

    db.algorithms.belongsToMany(db.users, {
      as: 'users',
      foreignKey: {
        name: 'algorithms_usersId',
      },
      constraints: false,
      through: 'algorithmsUsersUsers',
    });

    db.algorithms.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.algorithms.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return algorithms;
};

