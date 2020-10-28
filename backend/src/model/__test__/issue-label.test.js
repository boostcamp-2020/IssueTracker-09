/* eslint-disable no-undef */
const SequelizeMock = require('sequelize-mock');
const IssueLabel = require('../issue-label');

const sequelize = new SequelizeMock();
const DataTypes = sequelize.Sequelize;
const model = IssueLabel(sequelize, DataTypes);
const schema = model._defaults;

describe('User모델 테스트', () => {
  it('모델명이 알맞은가', () => {
    expect(model.name).toBe('Issue_Label');
  });

  it('모델의 Schema가 알맞는가', () => {
    expect(schema).toEqual({});
  });

  it('associate관계가 있는가', () => {
    expect(typeof model.associate).toBe('function');
  });
});