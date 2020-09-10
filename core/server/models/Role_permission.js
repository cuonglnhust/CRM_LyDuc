import { DataTypes } from 'sequelize';
import _ from 'lodash';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';
import { setArr, parseArr } from '../libs/common/db_parse'

export default class Role_permission extends BaseModel {

}

const attributes = {
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    role_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    permission_id: {
        type: DataTypes.TEXT,
        get: function () {
            return parseArr(this.getDataValue('permission_id'))
        },
        set: function (val) {
            this.setDataValue('permission_id', setArr(val));
        }
    },
    del: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
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

const options = {
    tableName: 'role_permission',
};
Role_permission.init(attributes, { ...options, sequelize });