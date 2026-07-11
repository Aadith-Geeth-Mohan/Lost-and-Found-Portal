import { Link } from 'react-router-dom';
export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const logout = () => { localStorage.clear(); window.location.href = '/login'; };
  return (
    <nav className="p-4 border-b flex flex-wrap gap-4 items-center">
      <Link to="/" className="font-bold">Lost & Found</Link>
      <Link to="/report">Report</Link>
      <Link to="/dashboard">Dashboard</Link>
      {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
      <div className="ml-auto flex gap-3">
        {user ? <button onClick={logout}>Logout</button> :
          <><Link to="/login">Login</Link><Link to="/signup">Signup</Link></>}
      </div>
    </nav>
  );
}