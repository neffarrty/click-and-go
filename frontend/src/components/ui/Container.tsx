import clsx from 'clsx'
import React from 'react'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className
}) => {
  return (
    <div
      className={clsx(
        'mx-auto max-w-[1080px] bg-white shadow-black px-4',
        className
      )}
    >
      {children}
    </div>
  )
}
