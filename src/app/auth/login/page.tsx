"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Image from 'next/image';
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

export default function LoginPage(){
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6,'Min 6 characters').required('Required')
    }),
    onSubmit: (values) => {
      login({ name: values.email.split('@')[0] || 'User', email: values.email });
      router.push('/dashboard');
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFB]">
      <AuthHeader rightLabel="Sign Up" rightHref="/auth/signup" />
      <div className="flex-1 flex items-center justify-center p-6">
        <form onSubmit={formik.handleSubmit} className="card-surface max-w-2xl w-full text-center" noValidate>
          <div className="min-h-[calc(60vh-72px)]">
              <h1 className="text-3xl font-semibold mb-5">Login</h1>
              <p className="text-md mb-8 text-gray-400">Enter your account email address and password to log in.</p>

              <div className="mb-2 relative">
                <Image src="/images/mail-icon.svg" alt="mail" width={20} height={20} className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-80" />
                <input
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="email"
                  className={`w-full border rounded-full p-4 pl-12 pr-4 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-[#E5E5E5]'}`}
                  placeholder="Email"
                  aria-invalid={formik.touched.email && !!formik.errors.email}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                  <div className="text-xs text-red-600 mb-2 text-left pl-2">{formik.errors.email}</div>
                ) : <div className="h-0 mb-2" />}

              <div className="mb-2 relative">
                <Image src="/images/password-icon.svg" alt="lock" width={20} height={20} className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-80" />
                <input
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full border rounded-full p-4 pl-12 pr-12 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-[#E5E5E5]'}`}
                  placeholder="Password"
                  aria-label="Password"
                  aria-invalid={formik.touched.password && !!formik.errors.password}
                />
                <Image
                  src="/images/eye-fill.svg"
                  alt={showPassword ? 'hide password' : 'show password'}
                  onClick={()=>setShowPassword(s=>!s)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e)=>{ if(e.key === 'Enter' || e.key === ' ') setShowPassword(s=>!s)}}
                  className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 opacity-80 cursor-pointer"
                  width={20}
                  height={20}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                  <div className="text-xs text-red-600 mb-4 text-left pl-2">{formik.errors.password}</div>
                ) : <div className="h-0 mb-4" />}

              <button type="submit" className="w-full btn-primary-pill mb-4">Login</button>

              <div className="flex items-center justify-center mb-6">
                  <Link href="/auth/forgot-password" className="text-md underline font-medium text-[var(--primary)]">Forgot password?</Link>
              </div>
            </div>
          <div className="text-center footer-bottom-line text-sm text-[var(--gray)] w-full pt-6 border-t border-[#E5E5E5]">
            Don&apos;t have an account? <Link href="/auth/signup" className="text-[var(--primary)] font-semibold">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}