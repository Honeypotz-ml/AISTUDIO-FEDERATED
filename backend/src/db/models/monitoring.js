const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const monitoring = sequelize.define(
    'monitoring',
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

  monitoring.associate = (db) => {
    db.monitoring.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.monitoring.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return monitoring;
};
