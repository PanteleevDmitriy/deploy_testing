'use client'

import { useState } from 'react'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Google login clicked')
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? 'Вход' : 'Регистрация'}
        </h1>
        <form>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Имя</label>
              <input type="text" id="name" className="w-full px-3 py-2 border rounded" required />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input type="email" id="email" className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block mb-2">Пароль</label>
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
            <button 
              type="button"
              className="absolute right-3 top-9 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
        <button 
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 flex items-center justify-center"
        >
          <FaGoogle className="mr-2" /> Войти через Google
        </button>
        <p className="mt-4 text-center">
          {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="ml-2 text-blue-600 hover:underline"
          >
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </div>
    </div>
  )
}

