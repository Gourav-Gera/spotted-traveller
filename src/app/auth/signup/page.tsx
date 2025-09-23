"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useAuth } from '../../../hooks/useAuth';

function AuthHeader({ rightLabel, rightHref }: { rightLabel?: string; rightHref?: string }){
  return (
    <div className="flex items-center justify-between py-5 px-0 border-b border-[#E5E5E5] mx-8 bg-white">
      <div className="text-2xl font-bold">Spotted.</div>
      <div>
        {rightLabel ? <Link href={rightHref|| '#'} className="px-5 py-2 text-sm rounded-full border">{rightLabel}</Link> : null}
      </div>
    </div>
  )
}

export default function Signup(){
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { name:'', email:'', dob:'', password:'' },
    validationSchema: Yup.object({
      name: Yup.string().min(2,'Too short').required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      dob: Yup.string().optional(),
      password: Yup.string().min(6,'Min 6 characters').required('Required')
    }),
    onSubmit: (values)=>{
      login({ name: values.name || values.email.split('@')[0] || 'User', email: values.email });
      router.push('/dashboard');
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFB]">
      <AuthHeader rightLabel="Login" rightHref="/auth/login" />
      <div className="flex-1 flex items-center justify-center p-6">
        <form onSubmit={formik.handleSubmit} className="card-surface max-w-xl w-full text-center" noValidate>
          <h1 className="text-3xl font-semibold mb-2">Sign Up</h1>
          <p className="text-sm mb-6 text-gray-400">Enter your details to create your account.</p>

          <div className="mb-2 relative">
            <img src="/images/password-icon.svg" alt="user" className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-80" />
            <input
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Name"
              className={`w-full border rounded-full p-3 pl-12 pr-4 ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-[#E5E5E5]'}`}
              aria-invalid={formik.touched.name && !!formik.errors.name}
            />
          </div>
          {formik.touched.name && formik.errors.name ? <div className="text-xs text-red-600 mb-2 text-left pl-2">{formik.errors.name}</div> : <div className="h-0 mb-2" />}

          <div className="mb-2 relative">
            <img src="/images/mail-icon.svg" alt="mail" className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-80" />
            <input
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email"
              className={`w-full border rounded-full p-3 pl-12 pr-4 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-[#E5E5E5]'}`}
              aria-invalid={formik.touched.email && !!formik.errors.email}
            />
          </div>
          {formik.touched.email && formik.errors.email ? <div className="text-xs text-red-600 mb-2 text-left pl-2">{formik.errors.email}</div> : <div className="h-0 mb-2" />}

          <div className="mb-4 relative">
            {/* left calendar placeholder icon (inline SVG) */}
            <img src="/images/birth-icon.svg" alt="mail" className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-80" />
            <input
              id="dob"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Date of birth"
              className="w-full border-[#E5E5E5] border rounded-full p-3 pl-12 pr-12" />
            {/* right calendar small icon */}
            <svg className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 opacity-80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#000" strokeOpacity="0.6" strokeWidth="1.2"/>
              <path d="M8 2v4M16 2v4" stroke="#000" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="mb-2 relative">
            <img src="/images/password-icon.svg" alt="lock" className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-80" />
            <input
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={showPassword ? 'text' : 'password'}
              className={`w-full border rounded-full p-3 pl-12 pr-12 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-[#E5E5E5]'}`}
              placeholder="Password"
              aria-label="Password"
              aria-invalid={formik.touched.password && !!formik.errors.password}
            />
            <img
              src="/images/eye-fill.svg"
              alt={showPassword ? 'hide password' : 'show password'}
              onClick={()=>setShowPassword(s=>!s)}
              role="button"
              tabIndex={0}
              onKeyDown={(e)=>{ if(e.key === 'Enter' || e.key === ' ') setShowPassword(s=>!s)}}
              className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 opacity-80 cursor-pointer"
            />
          </div>
          {formik.touched.password && formik.errors.password ? <div className="text-xs text-red-600 mb-4 text-left pl-2">{formik.errors.password}</div> : <div className="h-0 mb-4" />}

          <button type="submit" className="w-full btn-primary-pill mb-4">Continue</button>

          <div className="text-center footer-bottom-line text-sm text-[var(--gray)] pt-6 w-full border-t border-[#E5E5E5]">
            Already have an account? <Link href="/auth/login" className="text-[var(--primary)] underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
