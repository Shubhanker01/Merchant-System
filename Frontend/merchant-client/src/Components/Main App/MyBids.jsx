import NavbarApp from '../Header/NavbarApp'
import { useEffect } from 'react'
import { bidsSocket } from '../../socket'
import decodeToken from '../../utils/decodeJwt'
import getCookie from '../../utils/getCookie'
import { useState } from 'react'
import UserBids from '../Body/UserBids'
import UserBidsPagination from '../Footer/UserBidsPagination'
import SearchBar from '../Body/SearchBar'
import { queryBids } from '../../Async logic/bidsOperation'
import useDebounce from '../../hooks/useDebounce'

function MyBids() {
    const [userBids, setUserBids] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchBids, setSearchBids] = useState("")
    const cookie = getCookie()
    const user = decodeToken(cookie)
    const debouncedSearchValue = useDebounce(searchBids, 2000)
    useEffect(() => {
        bidsSocket.connect()
        return () => {
            bidsSocket.disconnect()
        }
    }, [])
    useEffect(() => {
        bidsSocket.emit('send-user-bids', user.name, currentPage)
        function getUserBids(arg) {
            console.log(arg)
            setTotalPages(arg.totalPages)
            setUserBids(arg.results)
        }
        bidsSocket.on('user-bids', getUserBids)
        return () => {
            bidsSocket.off('user-bids', getUserBids)
        }
    }, [currentPage])
    useEffect(() => {
        async function query() {
            if (debouncedSearchValue.trim() !== "") {
                let data = await queryBids(debouncedSearchValue, user.name)
                setUserBids(data)
                setTotalPages(0)
                setCurrentPage(1)
            }
            else {
                bidsSocket.emit('send-user-bids', user.name, currentPage)
            }
        }
        query()
    }, [debouncedSearchValue, currentPage])

    return (
        <>
            <NavbarApp />
            <div className='mt-[100px]'>
                <h1 className='ml-[20px] font-bold text-2xl'>Your Bids</h1>
                <SearchBar searchBids={searchBids} setSearchBids={setSearchBids} />
                <UserBids bids={userBids} setBids={setUserBids} />
                <UserBidsPagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>

        </>
    )
}

export default MyBids