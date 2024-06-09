// 常量路由：所有人都可以访问
export const constantRoute=[
    {
        path:'/',
        component:()=>import('@/views/Home/index.vue'),
        name:'Home'
    },
    {
        path:'/login',
        component:()=>import('@/views/Login/index.vue'),
        name:'Login'
    }
]
