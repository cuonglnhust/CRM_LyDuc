import {
    DataTypes, Op
  } from 'sequelize';
  import bcrypt from 'bcryptjs';
  import _ from 'lodash';
  import {
    sequelize
  } from '../connections';
  import BaseModel from './BaseModel';
  
  export default class Partner extends BaseModel {
    
    static getPartnerById(id) {
      return this.findOne({
        where: {
          del: 0,
          id
        }
      })
    }
  
    static createConditions(data) {
      let conditions = {
        where: {
          del: 0
        },
        order: [
          ['id', 'DESC']
        ]
      }
      if (data.name_partner) {
        conditions.where.name_partner = {
          [Op.like]: `%${data.name_partner}%`
        }
      }
      return conditions;
    }
  
    static getListPartner(data) {
      let conditions = this.createConditions(data);
      if (data.limit) {
        conditions.offset = (data.page - 1) * data.limit;
        conditions.limit = data.limit;
      }
      return this.findAll(conditions);
    }
  
    static countListPartner(data) {
      let conditions = this.createConditions(data);
      return this.count(conditions);
    }
  
  }
  const attributes = {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name_partner: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null
    },
    link_partner: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
      },
    del: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0
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
    tableName: 'partner'
  };
  
  /**
   * Init Model
   */
  Partner.init(attributes, {
    ...options,
    sequelize
  });