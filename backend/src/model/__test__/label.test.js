/* eslint-disable no-undef */
const SequelizeMock = require('sequelize-mock');
const Label = require('../label');

const sequelize = new SequelizeMock();
const DataTypes = sequelize.Sequelize;
const model = Label(sequelize, DataTypes);
const schema = model._defaults;

describe('Label모델 테스트', () => {
  it('모델명이 알맞은가', () => {
    expect(model.name).toBe('Label');
  });

  it('모델의 Schema가 알맞는가', () => {
    expect(schema).toEqual({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      color: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
      },
    });
  });

  it('associate관계가 있는가', () => {
    expect(typeof model.associate).toBe('function');
  });
});
