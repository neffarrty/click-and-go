'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'

const loginScheme = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
})

type LoginFormData = z.infer<typeof loginScheme>

const LoginForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<LoginFormData>({
    resolver: zodResolver(loginScheme),
    mode: 'onChange'
  })

  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginFormData) => authService.main('login', data),
    onSuccess() {
      toast.success('Successfully login!')
      reset()
      push(DASHBOARD_PAGES.PROFILE)
    },
    onError(error) {
      toast.error(error.message)
    }
  })

  const onSubmit: SubmitHandler<LoginFormData> = data => {
    mutate(data)
  }
}
