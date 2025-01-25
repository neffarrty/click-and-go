import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Login } from './Login'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Register',
  ...NO_INDEX_PAGE
}

export default function AuthPage() {
  return (
    <Container>
      <Login />
    </Container>
  )
}
