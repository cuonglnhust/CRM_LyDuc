import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeRequest } from '../../../libs/request'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listMenu: [
                {
                    id: 1,
                    name: 'Dashboard',
                    icon: 'icon-home5',
                    url: '/admin/dashboard',
                    path: '/admin/dashboard',
                    level: 1,
                    child: [],
                    action: 'dashboard'
                },
                {
                    id: 2,
                    name: 'Đối tác',
                    icon: 'icon-users4',
                    url: '/admin/partner',
                    path: '/admin/partner',
                    level: 1,
                    child: [
                        {
                            name: 'Tạo mới đối tác',
                            url: '/admin/partner/createPartner',
                            path: '/admin/createPartner',
                            parent: 2,
                            action: 'createPartner'
                        },
                        {
                            name: 'Danh sách đối tác',
                            url: '/admin/partner/listPartner',
                            path: '/listPartner',
                            parent: 2,
                            action: 'listPartner'
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Tin tức',
                    icon: 'icon-newspaper',
                    url: '/admin/news',
                    path: '/news',
                    level: 1,
                    child: [
                        {
                            name: "Tạo mới tin tức",
                            url: "/admin/news/createNews",
                            path: "/createNews",
                            parent: 3,
                            action: 'createNews'
                        },
                        {
                            name: "Danh sách tin tức",
                            url: "/admin/news/listNews",
                            path: "/listNews",
                            parent: 3,
                            action: 'listNews'
                        },
                        {
                            name: "Thể loại tin tức",
                            url: "/admin/news/category",
                            path: "/category",
                            parent: 3,
                            action:'listCategory'
                        },

                    ]
                },
                {
                    id: 4,
                    name: 'Quản lý thông tin giới thiệu',
                    icon: 'icon-newspaper',
                    url: '/admin/introduction',
                    path: '/introduction',
                    level: 1,
                    child: [
                        {
                            name: "Thế mạnh của công ty",
                            url: "/admin/introduction/strengths",
                            path: "/strengths",
                            parent: 4,
                            action:'strengths'
                        },
                        // {
                        //     name: "Thông tin giới thiệu ",
                        //     url: "/admin/introduction/introductions",
                        //     path: "/introductions",
                        //     parent: 4,
                        //     action:'introductions'
                        // },

                    ]
                },
                {
                    id: 5,
                    name: 'Quản lý dịch vụ',
                    icon: 'icon-wrench3',
                    url: '/admin/services',
                    path: '/services',
                    level: 1,
                    child: [
                        {
                            name: "Tạo nhóm dịch vụ",
                            url: "/admin/services/createServices",
                            path: "/createServices",
                            parent: 5,
                            action:'createServicesCategory'
                        },
                        {
                            name: "Danh sách dịch vụ",
                            url: "/admin/services/listServices",
                            path: "/listServices",
                            parent: 5,
                            action:'listServicesCategory'
                        },
                        
                    ]
                },
                {
                    id: 6,
                    name: "Cài đặt",
                    icon: 'icon-cogs',
                    url: '/admin/setting',
                    path: '/setting',
                    level: 1,
                    child: [
                        {
                            name: 'Slide trang chủ',
                            url: '/admin/setting/banner',
                            path: 'banner',
                            parent: 6,
                            action: 'settingBanner'
                        },
                        {
                            name: "Thông tin liên hệ",
                            url: "/admin/setting/about",
                            path: "/about",
                            parent: 6,
                            action: 'settingContact'
                        },
                        {
                            name: "Seo",
                            url: "/admin/setting/seo",
                            path: "/Seo",
                            parent: 6,
                            action: 'settingSeo'
                        },
                        {
                            name: "AppDetail",
                            url: "/admin/setting/appdetail",
                            path: "/AppDetail",
                            parent: 6,
                            action: 'settingAppDetail'
                        },
                    ]
                },
                {
                    id: 7,
                    name: "Quản lý quản trị viên",
                    icon: 'icon-users4',
                    url: '/admin/user',
                    path: '/user',
                    level: 1,
                    child: [
                        {
                            name: 'Thêm mới quản trị viên',
                            url: '/admin/user/create',
                            path: '/create',
                            parent: 7,
                            action: 'createUser'
                        },
                        {
                            name: 'Danh sách quản trị viên',
                            url: '/admin/user/list',
                            path: '/list',
                            parent: 7,
                            action: 'listUser'
                        },
                        {
                            name: 'Thêm mới nhóm quyền',
                            url: '/admin/user/createRole',
                            path: '/createRole',
                            parent: 7,
                            action: 'createRole'
                        },
                        {
                            name: 'Danh sách nhóm quyền',
                            url: '/admin/user/listRole',
                            path: '/listRole',
                            parent: 7,
                            action: 'listRole'
                        }
                    ]
                },
                {
                    id: 8,
                    name: 'Quản trị quyền',
                    icon: 'icon-accessibility',
                    url: '/admin/permission',
                    path: '/permission',
                    level: 1,
                    child: [
                        {
                            name: 'Thêm mới quyền',
                            url: '/admin/permission/create',
                            path: '/create',
                            parent: 8,
                            action: 'createPermission'
                        },
                        {
                            name: 'Danh sách quyền',
                            url: '/admin/permission/list',
                            path: '/list',
                            parent: 8,
                            action: 'listPermission'
                        }
                    ]
                },
                {
                    id: 9,
                    name: 'Quản lý quy trình',
                    icon: 'icon-stack3',
                    url: '/admin/process',
                    path: '/process',
                    level: 1,
                    child: [
                        {
                            name: 'Quy trình đăng kí Dịch vụ',
                            url: '/admin/process/processservice',
                            path: '/processservice',
                            parent: 9,
                            action: 'processService'
                        },
                        {
                            name: 'Quy trình đăng kí thợ',
                            url: '/admin/process/processworker',
                            path: '/processworker',
                            parent: 9,
                            action: 'processWorker'
                        }
                    ]
                },
            ],
            listPermission: [],
            idMenu: 1,
            idxActive: 0
        }
    }

    componentWillMount() {
        let { pathname } = this.props.location
        makeRequest('get', '/admin/permission/getPermissionUser', {

        }).then(result => {
            if (result.signal) {
                this.setState({
                    listPermission: result.data
                })
            } else {
                return showErrorMessage(result.message)
            }
        }).catch(err => {
            console.log(err)
        })
        this.caculatePathActive(pathname)
    }
    caculatePathActive(pathname) {
        let { listMenu } = this.state

        let idMenu = 1, idxActive = 0;
        listMenu.map((menu) => {
            if (pathname.indexOf(menu.path) >= 0) {
                idMenu = menu.id
                menu.child.map((child, idx) => {
                    if (pathname.indexOf(child.path) >= 0) {
                        idxActive = idx
                    }
                })
            }
        })

        this.setState({
            idMenu,
            idxActive
        })
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            this.caculatePathActive(nextProps.location.pathname)
        }
    }

    clickMenu(menu, idx, e) {
        e.preventDefault()
        let { history } = this.props
        let { idMenu } = this.state

        if (!menu.level || (menu.level == 1 && !menu.child.length && menu.id != idMenu)) {
            history.push(menu.url)
        }

        this.setState({
            idMenu: menu.id || menu.parent,
            idxActive: idx
        })
    }

    renderListMenu() {
        let { listMenu, idMenu, idxActive, listPermission } = this.state

        let contentMenu = listMenu.map((item, idx) => {
            let showContentMenu = false;
            if (!item.child.length) {
                if (!item.action) showContentMenu = true
                if (listPermission.indexOf(item.action) > -1) {
                    showContentMenu = true
                }
            }
            let children = item.child.map((child, child_idx) => {
                let classActive = ''
                if (item.id == idMenu && idxActive == child_idx) {
                    classActive = 'active'
                }
                if (listPermission.indexOf(child.action) > -1) {
                    showContentMenu = true
                    return (
                        <li key={'child-' + child_idx} className={classActive}><a href={child.url} onClick={this.clickMenu.bind(this, child, child_idx)}>{child.name}</a></li>
                    )
                } else {
                    return null
                }
            })
            if (!showContentMenu) return null
            return (
                <li className={(item.id == idMenu) ? 'active' : ''} key={'menu-parent-' + idx}>
                    {item.child.length ? (
                        <a href='#' className={(item.id == idMenu) ? "has-ul" : ''} onClick={this.clickMenu.bind(this, item, 0)}><i className={item.icon}></i> <span>{item.name}</span></a>
                    ) : (
                            <a href={item.url} onClick={this.clickMenu.bind(this, item, 0)}><i className={item.icon}></i> <span>{item.name}</span></a>
                        )}

                    {item.child.length ? (
                        <ul className={item.id == idMenu ? "" : 'hidden-ul'}>
                            {children}
                        </ul>
                    ) : ''}
                </li>
            )
        })

        return contentMenu

    }
    render() {
        return (
            <div className="sidebar-category sidebar-category-visible">
                <div className="category-content no-padding">
                    <ul className="navigation navigation-main navigation-accordion">
                        {this.props.profile.id ? (
                            this.renderListMenu()
                        ) : (null)}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let { users } = state;
    return {
        profile: users.profile
    };
}

export default withRouter(connect(mapStateToProps)(Navigation));