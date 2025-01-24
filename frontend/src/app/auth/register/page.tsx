import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Register } from './Register'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Register',
  ...NO_INDEX_PAGE
}

export default function AuthPage() {
  return (
    <Container>
      <Register />
    </Container>
  )
}
