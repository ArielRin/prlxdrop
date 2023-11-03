import { useAppContext } from '../context/context';
import style from '../styles/Header.module.css';
import UserCard from './UserCard';
import ConnectWalletBtn from './ConnectWalletBtn';

const Header = () => {
  const { address, connectWallet } = useAppContext();

  return (
    <div className={style.wrapper}>
      <img src="/textlogoheader.png" alt="PEET to PRLX Migration" style={{ width: '19%' }} />
      {!address ? (
        <ConnectWalletBtn connectWallet={connectWallet} />
      ) : (
        <UserCard address={address} />
      )}
    </div>
  );
};

export default Header;
