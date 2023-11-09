import Header from '../components/Header'
import PrlxClaim from '../components/PrlxClaim'
import Logo from '../components/Logo'
import Footer from '../components/Footer'
import StakeTest00001 from '../components/StakeTest00001'

import style from '../styles/Home.module.css'
export default function Home() {
  return (
    <div className={style.wrapper}>
      <Header />
      <PrlxClaim />
      <StakeTest00001 />
      <Logo />
            <Footer />
    </div>
  )
}
