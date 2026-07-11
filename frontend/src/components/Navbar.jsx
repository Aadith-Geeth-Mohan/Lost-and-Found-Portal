import { Link } from 'react-router-dom';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const logout = () => { localStorage.clear(); window.location.href = '/login'; };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 shadow-lg backdrop-blur-sm bg-opacity-95">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-wide">Lost<span className="text-primary-200">&</span>Found</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/report">Report</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-primary-100 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-primary-100 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-bold text-primary-700 bg-white hover:bg-primary-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <MobileMenu user={user} logout={logout} />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="px-3 py-2 text-sm font-medium text-primary-100 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200"
    >
      {children}
    </Link>
  );
}

function MobileMenu({ user, logout }) {
  return (
    <details className="md:hidden relative">
      <summary className="list-none cursor-pointer p-2 text-white hover:bg-white/10 rounded-lg">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-primary-100 py-2 animate-scale-in origin-top-right">
        <Link to="/" className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors">Home</Link>
        <Link to="/report" className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors">Report</Link>
        <Link to="/dashboard" className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors">Dashboard</Link>
        {user?.role === 'admin' && (
          <Link to="/admin" className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors">Admin</Link>
        )}
        <hr className="my-2 border-primary-100" />
        {user ? (
          <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">Logout</button>
        ) : (
          <>
            <Link to="/login" className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors">Login</Link>
            <Link to="/signup" className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors">Sign Up</Link>
          </>
        )}
      </div>
    </details>
  );
}
