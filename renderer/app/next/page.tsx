'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProtectedRoute } from '@/components/protected-route'

export default function NextPage() {
  return (
    <ProtectedRoute>
      <React.Fragment>
        <div className="grid grid-col-1 text-2xl w-full text-center">
          <div>
            <Image
              className="ml-auto mr-auto"
              src="/images/logo.png"
              alt="Logo image"
              width={256}
              height={256}
            />
          </div>
          <span>⚡ Nextron ⚡</span>
        </div>
        <div className="mt-1 w-full flex-wrap flex justify-center">
          <Link href="/">
            <Button>Go to home page</Button>
          </Link>
        </div>
      </React.Fragment>
    </ProtectedRoute>
  )
}
