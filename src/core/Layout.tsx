import { Outlet } from 'react-router'
import classes from './Layout.module.css'
import Header from './Header'
import Sidebar from './Sidebar'

function Layout() {
    return (
        <div className={classes.layout}>
            <Header />
            <Sidebar />

            <section className={classes.pageContent}>
                <Outlet />
            </section>
        </div>
    )
}

export default Layout
