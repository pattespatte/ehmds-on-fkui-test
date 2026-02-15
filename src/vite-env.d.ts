/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@fkui/vue' {
  export * from '@fkui/vue'
}

declare module '@fkui/design' {
  export * from '@fkui/design'
}

declare module '@fkui/logic' {
  export * from '@fkui/logic'
}

declare module '@fkui/date' {
  export * from '@fkui/date'
}

declare module '@fkui/theme-default' {
  export * from '@fkui/theme-default'
}

declare const __EHMDS_VERSION__: string
