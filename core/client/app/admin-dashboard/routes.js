import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/Main/App';
import MainLogin from './components/Main/MainLogin'
import Loadable from 'react-loadable';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />
)

const loadAsync = (opts) => {
    return Loadable(Object.assign({
        loading: () => {
            return (
                // <Loading/>
                <div>...Loading</div>
            )
        }
    }, opts));
}

export default () => {
    return (
        <BrowserRouter 
        // basename='/admin' 
        >

            <Switch>
                <AppRoute exact path="/admin/dashboard" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />

                <AppRoute exact path="/admin/login" layout={MainLogin} component={loadAsync({ loader: () => import('./components/Login/Login') })} />

                <AppRoute exact path="/admin/register" layout={MainLogin} component={loadAsync({ loader: () => import('./components/Register') })} />

                <AppRoute path="/admin/profile" layout={App} component={loadAsync({ loader: () => import('./components/Profile/UserProfile') })} />


                <AppRoute exact path="/admin/news/listNews" layout={App} component={loadAsync({ loader: () => import('./components/News')})}/>

                <AppRoute exact path="/admin/news/createNews" layout={App} component={loadAsync({ loader:()=>import('./components/News/createNews')})} />

                <AppRoute exact path="/admin/news/updateNews/:news_id" layout={App} component={loadAsync({ loader:()=>import('./components/News/updateNews')})} />

                <AppRoute exact path="/admin/news/category" layout={App} component={loadAsync({loader:()=>import('./components/News/Category')})} />


                <AppRoute exact path="/admin/setting/about" layout={App} component={loadAsync({loader:()=>import('./components/Setting/about')})} />

                <AppRoute exact path="/admin/setting/banner" layout={App} component={loadAsync({ loader: () => import('./components/Setting/Banner') })} />

                <AppRoute exact path="/admin/setting/seo" layout={App} component={loadAsync({ loader: () => import('./components/Setting/Seo') })} />

                <AppRoute exact path="/admin/setting/appdetail" layout={App} component={loadAsync({ loader: () => import('./components/Setting/AppDetail') })} />


                <AppRoute exact path="/admin/services/listServices" layout={App} component={loadAsync({loader:()=>import('./components/Services')})} />

                <AppRoute exact path="/admin/services/createServices" layout={App} component={loadAsync({loader:()=>import('./components/Services/createServices')})} />

                <AppRoute exact path="/admin/services/services_category/:service_id" layout={App} component={loadAsync({loader:()=>import('./components/Services/ServicesCategoryContent')})} />

                <AppRoute exact path="/admin/services/updateServices/:services_id" layout={App} component={loadAsync({ loader:()=>import('./components/Services/updateServices')})} />

                {/* Đối tác*/}

                <AppRoute exact path="/admin/partner/listPartner" layout={App} component={loadAsync({ loader: () => import('./components/Partner')})}/>

                <AppRoute exact path="/admin/partner/createPartner" layout={App} component={loadAsync({ loader:()=>import('./components/Partner/createPartner')})} />

                <AppRoute exact path="/admin/partner/updatePartner/:partner_id" layout={App} component={loadAsync({ loader:()=>import('./components/Partner/updatePartner')})} />

                {/* User */}

                <AppRoute exact path="/admin/user/create" layout={App} component={loadAsync({ loader:()=>import('./components/User/createUser')})} />

                <AppRoute exact path="/admin/user/list" layout={App} component={loadAsync({ loader: () => import('./components/User/listUser')})}/>

                <AppRoute exact path="/admin/user/createRole" layout={App} component={loadAsync({ loader: () => import('./components/Role/createRole')})}/>

                <AppRoute exact path="/admin/user/listRole" layout={App} component={loadAsync({ loader: () => import('./components/Role/listRole')})}/>

                <AppRoute exact path="/admin/user/updateRole/:role_id" layout={App} component={loadAsync({ loader: () => import('./components/Role/UpdateRole') })} />

                <AppRoute exact path="/admin/user/rolePermission/:role_id" layout={App} component={loadAsync({ loader: () => import('./components/Role/UpdateRolePermission') })} />

                <AppRoute exact path="/admin/user/update/:user_id" layout={App} component={loadAsync({ loader: () => import('./components/User/UpdateUser') })} />


                {/* Permission */}
                <AppRoute exact path="/admin/permission/create" layout={App} component={loadAsync({ loader: () => import('./components/Permission/CreatePermission') })} />
                <AppRoute exact path="/admin/permission/list" layout={App} component={loadAsync({ loader: () => import('./components/Permission/ListPermission') })} />
                <AppRoute exact path="/admin/permission/update/:permission_id" layout={App} component={loadAsync({ loader: () => import('./components/Permission/UpdatePermission') })} />

                <AppRoute exact path="/admin/error/denied" layout={MainLogin} component={loadAsync({ loader: () => import('./components/Error/Denied') })} />

                {/* Introduction*/ }
                <AppRoute exact path="/admin/introduction/strengths" layout={App} component={loadAsync({loader:()=>import('./components/Introduction/Strengths')})} />
                <AppRoute exact path="/admin/introduction/introductions" layout={App} component={loadAsync({loader:()=>import('./components/Introduction/Introductions')})} />

                {/* Process*/ }
                <AppRoute exact path="/admin/process/processWorker" layout={App} component={loadAsync({loader:()=>import('./components/Process/ProcessWorker')})} />
                <AppRoute exact path="/admin/process/processService" layout={App} component={loadAsync({loader:()=>import('./components/Process/ProcessService')})} />
            </Switch>

        </BrowserRouter>
    )
}