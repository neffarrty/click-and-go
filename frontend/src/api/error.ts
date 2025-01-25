import { AxiosError } from 'axios'

export const errorCatch = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message

    return message
      ? typeof message === 'object'
        ? message[0]
        : message
      : error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Unknown error'
}
