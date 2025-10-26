import React, { createContext, useEffect, useState } from 'react'

export const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
  const [grammarInput, setGrammarInput] = useState('')
  const [grammarOutput, setGrammarOutput] = useState('')
  const [user, setUser] = useState(null)

  const apiUrl = import.meta.env.VITE_API_URL 

  // Load user data from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])
  
  // Keep localStorage in sync when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const value = {
    grammarInput,
    setGrammarInput,
    grammarOutput,
    setGrammarOutput,
    user,
    setUser,
    apiUrl
  }

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}
