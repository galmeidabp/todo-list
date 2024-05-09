import LogoTodo from '../../assets/LogoTodo.svg'
import styles from './Header.module.css'


export function Header() {
   return(
      <header className={styles.header}>
         <img src={LogoTodo} alt="" />
      </header>
   )
}