import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
   <div style={{
      display: 'flex',        
      minHeight: '100vh', 
      width: '100vw',
      justifyContent: 'center',
      alignItems: 'center',     
      backgroundColor: '#f0f2f5',
      padding: '20px'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout