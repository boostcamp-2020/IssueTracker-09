/* eslint-disable no-undef */
const SequelizeMock = require('sequelize-mock');
const Comment = require('../comment');

const sequelize = new SequelizeMock();
const DataTypes = sequelize.Sequelize;
const model = Comment(sequelize, DataTypes);
const schema = model._defaults;

describe('User모델 테스트', () => {
  it('모델명이 알맞은가', () => {
    expect(model.name).toBe('Comment');
  });

  it('모델의 Schema가 알맞는가', () => {
    expect(schema).toEqual({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
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
