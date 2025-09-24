// src/router.ts

import { t } from './core/trpc/trpcContext'
import { loginRouter } from './features/auth/router/loginRouter'
import { initRouter as initRouter } from './features/auth/router/initRouter'
import { authRouter } from './features/auth/router/authRouter'
import { parentRouter } from './features/parent/router/parentRouter'
import { familyInviteRouter } from './features/family/router/familyInviteRouter'

// 各 feature のルーターを合体させるやつ✨
export const appRouter = t.router({
  login: loginRouter,
  init: initRouter,
  auth: authRouter,
  parent: parentRouter,
  familyInvite: familyInviteRouter,
  // 他にも必要なやつ追加してってね〜！
})

// ルーターの型（フロントでも使えるように）
export type AppRouter = typeof appRouter
