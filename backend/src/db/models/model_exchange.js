const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const model_exchange = sequelize.define(
    'model_exchange',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  model_exchange.associate = (db) => {
    db.model_exchange.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.model_exchange.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return model_exchange;
};
