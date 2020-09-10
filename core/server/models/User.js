import { DataTypes, Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

import { sequelize } from '../connections';
import BaseModel from './BaseModel';

export default class User extends BaseModel {

    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }

    setPassword(password) {
        this.password = bcrypt.hashSync(password, 10);
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    updatePassword(password) {
        let pass = bcrypt.hashSync(password, 10);
        return this.update({ password: pass });
    }
    static getUserByUserName(user_name) {
        return this.findOne({
            where: {
                user_name,
                del: 0
            }
        });
    }

    static getUserNews(id) {
        return this.findOne({
            where: {
                id,
                del: 0
            }
        });
    }

    static getUserById(id) {
        return this.findOne({
            where: {
                id,
                del: 0
            }
        });
    }
    static getCheckAccount(user_name, email, mobile) {
        return this.findOne({
            where: {
                [Op.or]: [{ user_name }, { email }, { mobile }],
                del: 0
            }
        })
    }
}
const beforeCreate = (user) => {
    if (user.password) {
        user.setPassword(user.password);
    }
};



const hooks = {
    beforeCreate
}

/**
 * Attributes model
 */
const attributes = {
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null
    },
    full_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
        validate: {
            isEmail: true
        }
    },
    mobile: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    status: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0
    },
    del: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    }
};

/**
 * Options model
 */
const options = {
    tableName: 'user',
    hooks
};

/**
 * Init Model
 */
User.init(attributes, { ...options, sequelize });