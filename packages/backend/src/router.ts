// src/router.ts

import { initTRPC } from '@trpc/server'
import { loginRouter } from './features/login/api/v1/login_router'

const t = initTRPC.create()

// 各 feature のルーターを合体させるやつ✨
export const appRouter = t.router({
  login: loginRouter,
  // 他にも必要なやつ追加してってね〜！
})

// ルーターの型（フロントでも使えるように）
export type AppRouter = typeof appRouter
