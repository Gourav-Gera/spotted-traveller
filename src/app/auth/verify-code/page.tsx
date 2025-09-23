"use client";
import React, { useRef } from "react";
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

export default function VerifyCode(){
  const router = useRouter();
  const inputsRef = useRef<Array<HTMLInputElement|null>>([]);

  const formik = useFormik({
    initialValues: { d1:'', d2:'', d3:'', d4:'' },
    validationSchema: Yup.object({
      d1: Yup.string().length(1,'').required(''),
      d2: Yup.string().length(1,'').required(''),
      d3: Yup.string().length(1,'').required(''),
      d4: Yup.string().length(1,'').required(''),
    }),
    onSubmit: (values)=>{
      const code = values.d1+values.d2+values.d3+values.d4;
      if(code.length === 4){
        router.push('/auth/reset-password');
      }
    }
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, idx: number){
    const val = e.target.value.replace(/[^0-9]/g,'');
    const name = `d${idx+1}` as const;
    if(val.length <=1){
      formik.setFieldValue(name, val);
      if(val && idx < 3){
        inputsRef.current[idx+1]?.focus();
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFB]">
      <AuthHeader rightLabel="Need Help?" />
      <div className="flex-1 flex items-center justify-center p-6">
        <form onSubmit={formik.handleSubmit} className="card-surface max-w-xl w-full text-center" noValidate>
          <h1 className="text-3xl font-bold mb-3">Verify Code</h1>
          <p className="text-md text-gray-400 mb-8">
            Please enter the 4 digit code sent to your registered email id
            <b> johndoe123@gmail.com</b></p>

          <div className="flex justify-center gap-3 mb-10">
            {(['d1','d2','d3','d4'] as const).map((name, i)=> {
              return (
                <input
                  key={i}
                  ref={(el)=>{ inputsRef.current[i]=el; }}
                  name={name}
                  value={formik.values[name]}
                  onChange={(e)=>handleChange(e,i)}
                  onKeyDown={(e)=>{
                    if(e.key==='Backspace' && !(e.currentTarget as HTMLInputElement).value && i>0){
                      inputsRef.current[i-1]?.focus();
                    }
                  }}
                  className={`w-16 h-16 text-center rounded-xl border ${formik.values[name]? 'border-black/60' : 'border-[#E5E5E5]'}`}
                  maxLength={1}
                  inputMode="numeric"
                  aria-label={`Digit ${i+1}`}
                />
              );
            })}
          </div>

          <button className="w-full btn-primary-pill">Verify</button>
          <div className="text-sm  pt-6 w-full ">Resend code in 
            <Link href="/auth/login" className="text-[var(--primary)] font-medium"> 00:30</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
