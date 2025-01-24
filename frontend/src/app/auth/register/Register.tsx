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

const registerScheme = z.object({
  name: z.string().min(4, 'Name must be at least 4 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
  //   password_confirmation: z
  //     .string()
  //     .min(8, 'Password must be at least 8 characters long')
  // })
  // .refine(data => data.password === data.password_confirmation, {
  //   path: ['password_confirmation'],
  //   message: 'Passwords do not match'
})

type RegisterFormData = z.infer<typeof registerScheme>

export const Register: React.FC = () => {
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
          id="name"
          label="Name"
          placeholder="Enter your name"
          type="text"
          {...register('name', {
            required: 'Name is required!'
          })}
        />

        <Field
          id="email"
          label="Email"
          errorMessage={errors.email?.message}
          placeholder="Enter your email"
          type="text"
          {...register('email', {
            required: 'Email is required!'
          })}
        />

        <Field
          id="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          errorMessage={errors.password?.message}
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
          Register
        </Button>
      </form>
    </>
  )
}
