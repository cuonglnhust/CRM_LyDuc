import {
  DataTypes, Op
} from 'sequelize';
import bcrypt from 'bcryptjs';
import randomize from 'randomatic';
import _ from 'lodash';

import {
  sequelize
} from '../connections';
import BaseModel from './BaseModel';
import Services_Category from './Services_Category'

export default class Services extends BaseModel {
  static association() {
    Services.belongsTo(Services_Category, { as: 'services_category', foreignKey: 'service_category_id' })
  }

  static
    createConditions() {
    let conditions = {
      where: {

      },
      order: [
        ['id', 'DESC']
      ],
      include:["services_category"]
    }

    return conditions;
  }

  static getListServices() {
    let conditions = this.createConditions()
    return this.findAll(conditions);
  }

  static getListServicesByCategory(service_category_id) {
    let conditions = {
      where:{
        service_category_id
      },
      include:["services_category"]
    }
    return this.findAll(conditions);
  }

  static getServicesByServiceId(service_id) {
    return this.findOne({
      where: {
        service_id
      }
    })
  }
}
const attributes = {
  id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  service_id: {
    type: DataTypes.INTEGER(10),
    allowNull: true,
    defaultValue: null
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  service_category_id: {
    type: DataTypes.INTEGER(10),
    allowNull: true,
    defaultValue: null
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

/**
 * Options model
 */
const options = {
  tableName: 'services'
};

/**
 * Init Model
 */
Services.init(attributes, {
  ...options,
  sequelize
});