export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.manage-docter', link: '/system/manage-doctor',
                //  link: '/system/user-docter',
                // name: 'menu.system.system-administrator.header',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },

            {
                name: 'menu.admin.manage-admin',
            },
            // link: '/system/user-admin',
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
        ],
    },
    {
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic',
            },
        ],
    },
    {
        name: 'menu.admin.speciality', menus: [
            {
                name: 'menu.admin.manage-specialty',
            },
        ],
    },
    {
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook',
            },
        ]
    }
]