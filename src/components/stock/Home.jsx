import React from 'react'

const Home = () => {
    const logout = ()=>{
        localStorage.clear()
        setTimeout(() => {
            window.location.reload()
        },200);
    }
  return (
    <div>
        <button onClick={logout} className='bg-red-50'>
            ออกจากระบบ
        </button>
    </div>
    
  )
}

export default Home