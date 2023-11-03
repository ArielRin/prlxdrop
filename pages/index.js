import Header from '../components/Header'
import PrlxClaim from '../components/PrlxClaim'
import Logo from '../components/Logo'
import Footer from '../components/Footer'

import style from '../styles/Home.module.css'
export default function Home() {
  return (
    <div className={style.wrapper}>
      <Header />
      <PrlxClaim />
      <Logo />
            <Footer />
    </div>
  )
}
