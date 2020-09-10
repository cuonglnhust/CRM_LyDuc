import { DataTypes } from 'sequelize';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

export default class About extends BaseModel {
    static getAboutById(id) {
        return this.findOne({
            where: {
                del: 0,
                id
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
    name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    hotline: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    mobile: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    facebook: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    youtube: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    twitter: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    pinterest: {
        type: DataTypes.STRING(255),
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
    tableName: 'about',
};

/**
 * Init Model
 */
About.init(attributes, { ...options, sequelize });