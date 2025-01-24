'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'

const registerScheme = z
  .object({
    name: z.string().min(4, 'Name must be at least 4 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    password_confirmation: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
  })
  .refine(data => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Passwords do not match'
  })

type RegisterFormData = z.infer<typeof registerScheme>

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerScheme),
    mode: 'onChange'
  })

  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: RegisterFormData) => authService.main('register', data),
    onSuccess() {
      toast.success('Successfully registered')
      reset()
      push(DASHBOARD_PAGES.PROFILE)
    },
    onError(error) {
      toast.error(error.message)
    }
  })

  const onSubmit: SubmitHandler<RegisterFormData> = data => {
    mutate(data)
  }
}
