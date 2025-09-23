"use client";
import { useEffect, useState, useCallback } from 'react';

type User = { name: string; email: string; avatar?: string } | null;

const STORAGE_KEY = 'spotted_user';

export function useAuth(){
  const [user, setUser] = useState<User>(null);

  useEffect(()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      setUser(raw ? JSON.parse(raw) : null);
    }catch(err){
      setUser(null);
    }

    function onAuth(){
      try{
        const raw = localStorage.getItem(STORAGE_KEY);
        setUser(raw ? JSON.parse(raw) : null);
      }catch(err){ setUser(null); }
    }

    window.addEventListener('storage', onAuth);
    window.addEventListener('spotted-auth', onAuth as EventListener);
    return ()=>{
      window.removeEventListener('storage', onAuth);
      window.removeEventListener('spotted-auth', onAuth as EventListener);
    }
  }, []);

  const login = useCallback((payload: { name: string; email: string; avatar?: string })=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setUser(payload);
    window.dispatchEvent(new Event('spotted-auth'));
  }, []);

  const updateUser = useCallback((partial: Partial<{ name: string; email: string; avatar?: string }>)=>{
    setUser(prev => {
      if(!prev) return prev;
      const next = { ...prev, ...partial };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event('spotted-auth'));
      return next;
    });
  }, []);

  const logout = useCallback(()=>{
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    window.dispatchEvent(new Event('spotted-auth'));
  }, []);

  return { user, login, logout, updateUser } as const;
}
