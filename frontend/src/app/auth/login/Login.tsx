'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { Field } from '@/components/ui/Fields/Field'
import { Button } from '@/components/ui/Button'

const loginScheme = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
})

type LoginFormData = z.infer<typeof loginScheme>

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginFormData>({
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

  return (
    <>
      <h1 className="text-xl font-extrabold text-center mt-[100px] mb-[50px]">
        Click&Go
      </h1>
      <form
        className="flex gap-8 flex-col min-h-screen "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field
          id="email"
          label="Email"
          placeholder="Enter your email"
          type="text"
          errorMessage={errors.email?.message}
          {...register('email', {
            required: 'Email is required!'
          })}
        />

        <Field
          id="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          // errorMessage={errors.password?.message}
          {...register('password', {
            required: 'Password is required!'
          })}
        />

        <Button
          type="submit"
          size="lg"
          variant="primary"
          className="mt-10"
        >
          Login
        </Button>
      </form>
    </>
  )
}
