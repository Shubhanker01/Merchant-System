import React from 'react'

function AddBid() {
    return (
        <div className='fixed bottom-[20px] right-[20px]'>
            <button className='m-4 bg-sky-950 rounded-md flex'>
                <img width="18" height="18" src="https://img.icons8.com/android/18/plus.png" alt="plus" />
                <p className='text-slate-100'>Add Bid</p>
            </button>
        </div>
    )
}

export default AddBid