import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './FormStyles.css';

function RegistrationForm({ onComplete }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneCode: '+380',
      phone: '',
      confirmationCode: '',
      email: '',
      password: '',
    },
  });

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const phoneCode = watch('phoneCode');
  const phoneValue = watch('phone');
  const codeValue = watch('confirmationCode');
  const passwordValue = watch('password');

  const handleSendCode = () => {
    if (!phoneValue) {
      alert('First enter your phone number');
      return;
    }
    setStep(2);
  };

  const handleConfirmCode = () => {
    if (codeValue === '1234') {
      setStep(3);
    } else {
      alert('Invalid confirmation code');
    }
  };

  const onSubmit = (data) => {
    const fullPhone = `${data.phoneCode} ${data.phone}`;
    const submissionData = { ...data, phone: fullPhone };
    console.log('Registration form data:', submissionData);
    onComplete && onComplete(submissionData);
  };

  const progressPercentage = (step / 3) * 100;

  const isStep3Valid =
    passwordValue && passwordValue.length >= 6 && !errors.email && !errors.password;

  return (
    <>
      <div className="header-area">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <h1>Registration</h1>
        <p1>Fill in the registration data. It will take a couple of minutes.</p1>
        <p1>All you need is a phone number and e-mail</p1>
      </div>

      <div >
        {step === 1 && (
          <div className="space-y-6">
            <div className="form-container">
              <label htmlFor="phone" className="block text-gray-700 mb-2">
                Enter your phone number
              </label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <select
                  id="phoneCode"
                  {...register('phoneCode', { required: 'Required' })}
                  className="line-input"
                  style={{ maxWidth: '80px' }}
                >
                  <option value="+380">+380</option>
                  <option value="+1">+1</option>
                  <option value="+86">+86</option>
                  <option value="+44">+44</option>
                  <option value="+49">+49</option>
                  <option value="+33">+33</option>
                  <option value="+48">+48</option>
                </select>
              
                <input
                  id="phone"
                  type="tel"
                  placeholder="000-00-00-00"
                  {...register('phone', { required: 'This field is required' })}
                  className="line-input"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
            <button 
              type="button"
              onClick={handleSendCode}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
            >
              Send code 
            </button>
          </div>         
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="form-container">
            <div>
              <label className="block text-gray-700 mb-2">
                Enter your phone number
              </label>
              <input
                type="tel"
                value={`${phoneCode} ${phoneValue}`}
                disabled
                className="line-input w-full"
              />
              <div>
              <label htmlFor="confirmationCode" className="block text-gray-700 mb-2">
                Confirmation code
              </label>
              <div style={{ display: 'flex', gap: '1rem' }}>
              <input
                id="confirmationCode"
                type="text"
                placeholder=" - - - - "
                {...register('confirmationCode', { required: 'This field is required' })}
                className="line-input"
              />
              {errors.confirmationCode && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmationCode.message}</p>
              )}
              
              <button
                type="button"
                onClick={() => {
                  reset({ confirmationCode: '' }, { keepValues: true });
                  alert('Code resent!');
                }}
                className="text-blue-500 underline text-sm mt-2"
              >
                Send again
              </button>
              
              </div>
              <label htmlFor="confirmationCode" className="block text-gray-700 mb-2">
              Confirm phone number with code from sms message
              </label>
            </div>
            </div>
            </div>
            
            
            <button
              type="button"
              onClick={handleConfirmCode}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
            >
              Confirm
            </button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
            <div className="form-container">
              <label className="block text-gray-700 mb-2">Phone number</label>
              <input
                type="tel"
                value={`${phoneCode} ${phoneValue}`}
                disabled
                className="line-input w-full"
              />
              <label htmlFor="confirmationCode" className="block text-gray-700 mb-2">
              Number confirmed
              </label>
            </div>
            <div className="form-container">
            <div >
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Enter your Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@mail.com"
                {...register('email', {
                  required: 'This field is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid format email' },
                })}
                className="line-input w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
              
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Set a password
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                {...register('password', {
                  required: 'This field is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' },
                })}
                className="line-input w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="checkmark-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.956 9.956 0 012.725-6.425M16.125 5.175A9.956 9.956 0 0121 9c0 5.523-4.477 10-10 10a10.05 10.05 0 01-1.875-.175"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="checkmark-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
              {!errors.password && passwordValue?.length >= 6 && (
                <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="checkmark-icon text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            </div>

            </div>
            <button
              type="submit"
              className={`w-full py-3 rounded-lg transition ${
                isStep3Valid ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-400 text-gray-800'
              }`}
            >
              Register Now
            </button>
          </form>
        )}
      </div>
    </>
  );
}
export default RegistrationForm;
