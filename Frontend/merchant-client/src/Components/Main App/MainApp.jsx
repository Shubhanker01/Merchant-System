import React from 'react'
import NavbarApp from '../Header/NavbarApp'
import AddBid from '../Footer/AddBid'
import BidsTable from '../Body/BidsTable'

function MainApp() {
    return (
        <div>
            <NavbarApp />
            <BidsTable />
            <AddBid />
        </div>
    )
}

export default MainApp