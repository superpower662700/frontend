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
            // link: '/system/user-admin',
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },

            {
                name: 'menu.doctor.manage-doctor', link: '/doctor/manage-schedule',
            },
        ],
    },
    {
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic',
            },
        ],
    },
    {
        name: 'menu.admin.speciality', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',
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

export const doctorMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.doctor.manage-doctor', link: '/doctor/manage-schedule',
            },
        ],
    },

]