import { ReactNode } from 'react'

export default function ErrorMessage({children}: {children: ReactNode}) {
  return (
    <div className=' text-center my-3 bg-red-100 text-red-600 font-bold py-1 uppercase text-xs'>
        {children}
    </div>
  )
}
