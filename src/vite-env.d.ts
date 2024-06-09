/// <reference types="vite/client" />

/**
 * Cannot find module '@/views/xxx.vue' or its corresponding type declarations
 * 去除以上报错信息
 */
declare module '*.vue' {
    import { DefineComponent } from "vue"
    const component: DefineComponent<{}, {}, any>
    export default component
}