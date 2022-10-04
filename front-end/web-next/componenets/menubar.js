import styles from '../styles/menubar.module.css'
import homebutton from '../img/homebutton.png'
import Image from 'next/image'


const MenuBar = ({children}) => {
    return (
        <>
            <div id = {styles.menubar}>
            <Image id={styles.homebutton} src = {homebutton.src} width = '28px' height = '24px' style = {{margin: 'auto'}}/>

            
            </div>
            <div id = {styles.child}>
                {children}
            </div>
        </>
    )
}
export default MenuBar;