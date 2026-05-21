import { Link, useLocation } from 'react-router';

import {
  GraduationCap,
  Moon,
  Sun,
  Heart,
  GitCompare,
  Menu,
  X,
  Eye,
  EyeOff,
  Mail,
  Lock,
} from 'lucide-react';

import { useApp } from '../contexts/AppContext';

import { useState } from 'react';

import {
  loginUser,
  registerUser,
} from '../../services/authService';

export default function Navbar() {

  const {
    isDarkMode,
    toggleDarkMode,
    wishlist,
    compareList,
  } = useApp();

  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [loginOpen, setLoginOpen] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [isRegister, setIsRegister] =
    useState(false);

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');



  // LOGIN STATE

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      localStorage.getItem('isLoggedIn') === 'true'
    );



  const isActive = (path: string) =>
    location.pathname === path;



  // LOGIN FUNCTION

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!email.trim() || !password.trim()) {

      alert('Please fill all fields');

      return;
    }

    try {

      setLoading(true);

      const data = await loginUser(
        email,
        password
      );

      if (data?.success) {

        alert('Login Successful');

        localStorage.setItem(
          'isLoggedIn',
          'true'
        );

        localStorage.setItem(
          'userEmail',
          email
        );

        setIsLoggedIn(true);

        setLoginOpen(false);

        setEmail('');

        setPassword('');

      } else {

        alert(
          data?.message ||
          'Invalid credentials'
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        'Cannot connect to backend'
      );

    } finally {

      setLoading(false);
    }
  };



  // REGISTER FUNCTION

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!email.trim() || !password.trim()) {

      alert('Please fill all fields');

      return;
    }

    try {

      setLoading(true);

      const data = await registerUser(
        email,
        password
      );

      if (data?.success) {

        alert(
          'Registration Successful'
        );

        setIsRegister(false);

        setEmail('');

        setPassword('');

      } else {

        alert(
          data?.message ||
          'Registration failed'
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        'Cannot connect to backend'
      );

    } finally {

      setLoading(false);
    }
  };



  // LOGOUT FUNCTION

  const handleLogout = () => {

    localStorage.removeItem(
      'isLoggedIn'
    );

    localStorage.removeItem(
      'userEmail'
    );

    setIsLoggedIn(false);

    alert('Logged out');
  };



  return (
    <>

      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center h-16">

            {/* LOGO */}

            <Link
              to="/"
              className="flex items-center gap-2 group"
            >

              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">

                <GraduationCap className="w-6 h-6 text-white" />

              </div>

              <span className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">

                CareerCourse

              </span>

            </Link>



            {/* DESKTOP MENU */}

            <div className="hidden md:flex items-center gap-8">

              <Link
                to="/"
                className={`text-sm transition-colors ${
                  isActive('/')
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Home
              </Link>

              <Link
                to="/courses"
                className={`text-sm transition-colors ${
                  isActive('/courses')
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Courses
              </Link>

              <Link
                to="/quiz"
                className={`text-sm transition-colors ${
                  isActive('/quiz')
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Career Quiz
              </Link>

            </div>



            {/* RIGHT SECTION */}

            <div className="flex items-center gap-4">

              {/* WISHLIST */}

              <Link
                to="/courses"
                className="relative p-2 hover:bg-accent rounded-lg transition-colors"
              >

                <Heart className="w-5 h-5 text-muted-foreground" />

                {wishlist.length > 0 && (

                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

                    {wishlist.length}

                  </span>
                )}

              </Link>



              {/* COMPARE */}

              <Link
                to="/courses"
                className="relative p-2 hover:bg-accent rounded-lg transition-colors"
              >

                <GitCompare className="w-5 h-5 text-muted-foreground" />

                {compareList.length > 0 && (

                  <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

                    {compareList.length}

                  </span>
                )}

              </Link>



              {/* DARK MODE */}

              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >

                {isDarkMode ? (

                  <Sun className="w-5 h-5 text-muted-foreground" />

                ) : (

                  <Moon className="w-5 h-5 text-muted-foreground" />

                )}

              </button>



              {/* LOGIN / LOGOUT BUTTON */}

              {isLoggedIn ? (

                <div className="hidden md:flex items-center gap-3">

                  <span className="text-sm font-medium text-foreground">

                    {localStorage.getItem('userEmail')}

                  </span>

                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 bg-red-500 text-white rounded-xl hover:opacity-90 transition-all duration-300"
                  >
                    Logout
                  </button>

                </div>

              ) : (

                <button
                  onClick={() =>
                    setLoginOpen(true)
                  }
                  className="hidden md:block px-5 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-md"
                >
                  Login
                </button>

              )}



              {/* MOBILE MENU BUTTON */}

              <button
                onClick={() =>
                  setMobileMenuOpen(
                    !mobileMenuOpen
                  )
                }
                className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
              >

                {mobileMenuOpen ? (

                  <X className="w-5 h-5" />

                ) : (

                  <Menu className="w-5 h-5" />

                )}

              </button>

            </div>

          </div>

        </div>

      </nav>



      {/* LOGIN / REGISTER MODAL */}

      {loginOpen && (

        <div
          onClick={() =>
            setLoginOpen(false)
          }
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6"
          >

            {/* CLOSE BUTTON */}

            <button
              onClick={() =>
                setLoginOpen(false)
              }
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent transition-colors"
            >

              <X className="w-5 h-5" />

            </button>



            {/* TITLE */}

            <div className="text-center mb-8">

              <h2 className="text-3xl font-bold text-foreground mb-2">

                {isRegister
                  ? 'Create Account'
                  : 'Welcome Back'}

              </h2>

              <p className="text-muted-foreground">

                {isRegister
                  ? 'Register to start your learning journey'
                  : 'Login to continue your learning journey'}

              </p>

            </div>



            {/* FORM */}

            <form
              onSubmit={
                isRegister
                  ? handleRegister
                  : handleLogin
              }
              className="space-y-5"
            >

              {/* EMAIL */}

              <div>

                <label className="block text-sm font-medium mb-2">

                  Email

                </label>

                <div className="relative">

                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />

                </div>

              </div>



              {/* PASSWORD */}

              <div>

                <label className="block text-sm font-medium mb-2">

                  Password

                </label>

                <div className="relative">

                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-3 top-3"
                  >

                    {showPassword ? (

                      <EyeOff className="w-5 h-5 text-muted-foreground" />

                    ) : (

                      <Eye className="w-5 h-5 text-muted-foreground" />

                    )}

                  </button>

                </div>

              </div>



              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {loading
                  ? isRegister
                    ? 'Creating Account...'
                    : 'Logging in...'
                  : isRegister
                    ? 'Register'
                    : 'Login'}

              </button>



              {/* SWITCH BUTTON */}

              <div className="text-center pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setIsRegister(
                      !isRegister
                    )
                  }
                  className="text-primary hover:underline text-sm"
                >

                  {isRegister
                    ? 'Already have an account? Login'
                    : "Don't have an account? Register"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </>
  );
}
