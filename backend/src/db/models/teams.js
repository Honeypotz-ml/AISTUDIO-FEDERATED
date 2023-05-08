const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const teams = sequelize.define(
    'teams',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

team_name: {
        type: DataTypes.TEXT,

      },

description: {
        type: DataTypes.TEXT,

      },

company: {
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

  teams.associate = (db) => {

    db.teams.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.teams.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return teams;
};

