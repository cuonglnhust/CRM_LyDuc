export { default as User } from './User';

export { default as CodeForgot } from './CodeForgot'

export { default as News } from './News'

export { default as Category }from './Category'

export { default as Partner }from './Partner'

export { default as About } from './About'

export { default as Services } from './Services'

export { default as Services_Category } from './Services_Category'

export { default as Services_Category_Content } from './Services_Category_Content'

export { default as Role } from './Role'

export { default as User_Role } from './User_Role'

export { default as Permission } from './Permission'

export { default as Role_permission } from './Role_permission'

export { default as Banner } from './Banner'

export { default as Strengths } from './Strengths'

export { default as Seo } from './Seo'

export { default as Introductions } from './Introductions'

export { default as ProcessWorker } from './ProcessWorker'

export { default as ProcessService } from './ProcessService'

export { default as AppDetail } from './AppDetail'

import { sequelize } from '../connections';

// Init association
for (let m in sequelize.models) {
    sequelize.models[m].association();
}