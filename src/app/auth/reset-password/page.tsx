"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

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

export default function ResetPassword(){
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: { password:'', confirm:'' },
    validationSchema: Yup.object({
      password: Yup.string().min(6,'Min 6 characters').required('Required'),
      confirm: Yup.string().oneOf([Yup.ref('password')],'Passwords must match').required('Required')
    }),
    onSubmit: ()=>{
      router.push('/auth/password-updated');
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFB]">
      <AuthHeader rightLabel="Need Help?" />
      <div className="flex-1 flex items-center justify-center p-6">
        <form onSubmit={formik.handleSubmit} className="card-surface max-w-xl w-full text-center" noValidate>
          <h1 className="text-3xl font-semibold mb-2">Reset Password</h1>
          <p className="text-md mb-8 text-gray-400">Enter a strong password to secure your account.</p>

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
              placeholder="New Password"
              aria-label="New Password"
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
            {formik.touched.password && formik.errors.password ? <div className="text-xs text-red-600 absolute -bottom-5 left-2">{formik.errors.password}</div> : null}
          </div>

          <div className="mt-6 mb-2 relative">
            <img src="/images/password-icon.svg" alt="lock" className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-80" />
            <input
              id="confirm"
              name="confirm"
              value={formik.values.confirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={showConfirm ? 'text' : 'password'}
              className={`w-full border rounded-full p-3 pl-12 pr-12 ${formik.touched.confirm && formik.errors.confirm ? 'border-red-500' : 'border-[#E5E5E5]'}`}
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              aria-invalid={formik.touched.confirm && !!formik.errors.confirm}
            />
            <img
              src="/images/eye-fill.svg"
              alt={showConfirm ? 'hide password' : 'show password'}
              onClick={()=>setShowConfirm(s=>!s)}
              role="button"
              tabIndex={0}
              onKeyDown={(e)=>{ if(e.key === 'Enter' || e.key === ' ') setShowConfirm(s=>!s)}}
              className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 opacity-80 cursor-pointer"
            />
            {formik.touched.confirm && formik.errors.confirm ? <div className="text-xs text-red-600 absolute -bottom-5 left-2">{formik.errors.confirm}</div> : null}
          </div>

          <button type="submit" className="w-full btn-primary-pill font-medium">Update Password</button>
        </form>
      </div>
    </div>
  )
}
