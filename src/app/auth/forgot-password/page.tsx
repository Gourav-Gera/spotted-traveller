"use client";
import React from "react";
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

export default function ForgotPasswordPage(){
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required')
    }),
    onSubmit: () => {
      router.push('/auth/verify-code');
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFB]">
      <AuthHeader rightLabel="Need Help?" rightHref="/auth/signup" />
      <div className="flex-1 flex items-center justify-center p-6">
        <form onSubmit={formik.handleSubmit} className="card-surface max-w-xl w-full text-center" noValidate>
          <h1 className="text-3xl font-semibold mb-3">Forgot Password?</h1>
          <p className="text-sm mb-6 text-gray-400">Enter your email address and we'll send you a 4 digit verification code to reset your password.</p>
          {formik.touched.email && formik.errors.email ? <div className="text-sm text-red-600 mb-2">{formik.errors.email}</div> : <div className="h-0 mb-2" />}

          <div className="mb-6 relative">
            <img src="/images/mail-icon.svg" alt="mail" className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-80" />
            <input
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              className={`w-full border rounded-full p-3 pl-12 pr-4 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-[#E5E5E5]'}`}
              placeholder="Email"
              aria-label="Email"
              aria-invalid={formik.touched.email && !!formik.errors.email}
            />
          </div>

          <button type="submit" className="w-full btn-primary-pill">Continue</button>
          <div className="text-center footer-bottom-line text-sm back-to-login pt-6 w-full border-t border-[#E5E5E5]">Back to
            <Link href="/auth/login" className="text-[var(--primary)] underline font-medium"> Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}