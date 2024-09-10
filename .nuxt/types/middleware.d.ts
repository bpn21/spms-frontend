import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "admin" | "guest"
declare module "/Users/macbookair/Documents/sshp/frontend/spms-frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}