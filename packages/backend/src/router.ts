// src/router.ts

import { t } from './core/trpc/trpcContext'
import { loginRouter } from './features/auth/router/loginRouter'
import { initRouter as initRouter } from './features/auth/router/initRouter'
import { parentRouter } from './features/parent/router/parentRouter'

// 各 feature のルーターを合体させるやつ✨
export const appRouter = t.router({
  login: loginRouter,
  init: initRouter,
  parent: parentRouter,
  // 他にも必要なやつ追加してってね〜！
})

// ルーターの型（フロントでも使えるように）
export type AppRouter = typeof appRouter
