import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

import * as S from 'styles/pages/error'

const Custom500 = () => {
  const router = useRouter()
  const [seconds, setSeconds] = useState(10)

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds((state) => state - 1)
      }, 1000)
    } else {
      router.push('/')
    }
  }, [router, seconds])

  return (
    <>
      <Header />

      <S.Container>
        <div>
          <h1>500 - Server-side error occurred</h1>
          <div>Redirect in {seconds} seconds...</div>
        </div>
      </S.Container>

      <Footer />
    </>
  )
}

export default Custom500
