/* eslint-disable no-undef */
const SequelizeMock = require('sequelize-mock');
const User = require('../user');

const sequelize = new SequelizeMock();
const DataTypes = sequelize.Sequelize;
const model = User(sequelize, DataTypes);
const schema = model._defaults;

describe('User모델 테스트', () => {
  it('모델명이 알맞은가', () => {
    expect(model.name).toBe('User');
  });

  it('모델의 Schema가 알맞는가', () => {
    expect(schema).toEqual({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(255),
        defaultValue: '',
      },
    });
  });

  it('associate관계가 있는가', () => {
    expect(typeof model.associate).toBe('function');
  });
});
