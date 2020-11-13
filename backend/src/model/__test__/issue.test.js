/* eslint-disable no-undef */
const SequelizeMock = require('sequelize-mock');
const Issue = require('../issue');

const sequelize = new SequelizeMock();
const DataTypes = sequelize.Sequelize;
const model = Issue(sequelize, DataTypes);
const schema = model._defaults;

describe('Issue모델 테스트', () => {
  it('모델명이 알맞은가', () => {
    expect(model.name).toBe('Issue');
  });

  it('모델의 Schema가 알맞는가', () => {
    expect(schema).toEqual({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      is_opened: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  });

  it('associate관계가 있는가', () => {
    expect(typeof model.associate).toBe('function');
  });
});
