/* eslint-disable no-undef */
const SequelizeMock = require('sequelize-mock');
const AssigneeIssue = require('../assignee-issue');

const sequelize = new SequelizeMock();
const DataTypes = sequelize.Sequelize;
const model = AssigneeIssue(sequelize, DataTypes);
const schema = model._defaults;

describe('Assignee_Issue 모델 테스트', () => {
  it('모델명이 알맞은가', () => {
    expect(model.name).toBe('Assignee_Issue');
  });

  it('모델의 Schema가 알맞는가', () => {
    expect(schema).toEqual({});
  });

  it('associate관계가 있는가', () => {
    expect(typeof model.associate).toBe('function');
  });
});
