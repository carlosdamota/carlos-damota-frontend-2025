import React from 'react'
import form from './form.module.css'

export const Forms = ({children}: {children: React.ReactNode}) => {
  return (
    <form id='connect-form' className={form.form}>
        {children}
      </form>
  )
}
