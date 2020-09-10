import { DataTypes, Op } from 'sequelize';
import _ from 'lodash';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

export default class Banner extends BaseModel {

    static createCondition(data) {
        let conditions = {
            where: {
                del: 0
            },
            order: [['id', 'DESC']]
        }
        if (data.title) {
            conditions.where.title = {
                [Op.like]: `%${data.title}%`
            }
        }
        if (data.active && data.active == 0) {
            conditions.where.active = parseInt(data.active)
        }
        return conditions
    }

    static getAllBaneer(data) {
        let conditions = this.createCondition(data);
        if (data.page != 0) {
            conditions.offset = (data.page - 1) * data.limit
            conditions.limit = data.limit
        }
        return this.findAll(conditions)
    }

    static getListBanner(data) {
        let conditions = {
            where: {
                active:1,
                del: 0
            },
            order: [['id', 'DESC']]
        }
        return this.findAll(conditions)
    }

    static getListBannerDes(data) {
        let conditions = {
            where: {
                active:1,
                del: 0,
                type:1
            },
            order: [['id', 'DESC']]
        }
        return this.findAll(conditions)
    }

    static getListBannerMob(data) {
        let conditions = {
            where: {
                active:1,
                del: 0,
                type:0
            },
            order: [['id', 'DESC']]
        }
        return this.findAll(conditions)
    }

    static countAllBanner(data) {
        let conditions = this.createCondition(data)
        return this.count(conditions)
    }

    static getBannerById(id) {
        return this.findOne({
            where: {
                id,
                del: 0
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
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    active: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 0
    },
    type: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 0
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
    tableName: 'banner',
};
Banner.init(attributes, { ...options, sequelize });