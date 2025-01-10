// 常量路由：所有人都可以访问
export const constantRoute=[
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:()=>import('@/views/Home/index.vue'),
        name:'Home'
    },
    {
        path:'/imgCollection',
        component:()=>import('@/views/Home/components/ImgCollection.vue'),
        name:'ImgCollection'
    }
]
