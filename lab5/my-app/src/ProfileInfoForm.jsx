import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaPhone, FaEnvelope, FaSkype, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './FormStyles.css';

function ProfileInfoForm({ onSave, phone, email }) {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      dateOfBirth: '',
      socialNetwork1Type: '',
      socialNetwork1Username: '',
      socialNetwork2Type: '',
      socialNetwork2Username: '',
      postalCode: '',
      address: '',
    },
  });

  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const progressPercentage = (step / 3) * 100;

  useEffect(() => {
    const dummyCountries = [
      { code: 'Ukraine', name: 'Ukraine' },
      { code: 'USA', name: 'USA' },
      { code: 'Great Britain', name: 'Great Britain' },
      { code: 'Poland', name: 'Poland' },
      { code: 'Germany', name: 'Germany' },
      { code: 'France', name: 'France' },
      { code: 'China', name: 'China' },
    ];
    setCountries(dummyCountries);
  }, []);

  const selectedCountry = watch('country');
  useEffect(() => {
    if (selectedCountry) {
      let dummyCities = [];
      if (selectedCountry === 'Ukraine') {
        dummyCities = [
          { id: 'Kyiv', name: 'Kyiv' },
          { id: 'Lviv', name: 'Lviv' },
          { id: 'Odessa', name: 'Odesa' },
          { id: 'Dnipro', name: 'Dnipro' },
          { id: 'Kharkiv', name: 'Kharkiv' },
        ];
      } else if (selectedCountry === 'USA') {
        dummyCities = [
          { id: 'New York', name: 'New York' },
          { id: 'Los Angeles', name: 'Los Angeles' },
          { id: 'Chicago', name: 'Chicago' },
          { id: 'Houston', name: 'Houston' },
          { id: 'Phoenix', name: 'Phoenix' },
        ];
      } else if (selectedCountry === 'Great Britain') {
        dummyCities = [
          { id: 'London', name: 'London' },
          { id: 'Birmingham', name: 'Birmingham' },
          { id: 'Glasgow', name: 'Glasgow' },
          { id: 'Leeds', name: 'Leeds' },
          { id: 'Sheffield', name: 'Sheffield' },
        ];
      } else if (selectedCountry === 'France') {
        dummyCities = [
          { id: 'Paris', name: 'Paris' },
          { id: 'Marseille', name: 'Marseille' },
          { id: 'Lyon', name: 'Lyon' },
          { id: 'Toulouse', name: 'Toulouse' },
          { id: 'Nice', name: 'Nice' },
        ];
      } else if (selectedCountry === 'China') {
        dummyCities = [
          { id: 'Shanghai', name: 'Shanghai' },
          { id: 'Beijing', name: 'Beijing' },
          { id: 'Guangzhou', name: 'Guangzhou' },
          { id: 'Shenzhen', name: 'Shenzhen' },
          { id: 'Tianjin', name: 'Tianjin' },
        ];
      } else if (selectedCountry === 'Poland') {
        dummyCities = [
          { id: 'Warsaw', name: 'Warsaw' },
          { id: 'Krakow', name: 'Krakow' },
          { id: 'Lodz', name: 'Lodz' },
          { id: 'Wroclaw', name: 'Wroclaw' },
          { id: 'Poznan', name: 'Poznan' },
        ];
      } else if (selectedCountry === 'Germany') {
        dummyCities = [
          { id: 'Berlin', name: 'Berlin' },
          { id: 'Hamburg', name: 'Hamburg' },
          { id: 'Munich', name: 'Munich' },
          { id: 'Cologne', name: 'Cologne' },
          { id: 'Frankfurt', name: 'Frankfurt' },
        ];
      }
      setCities(dummyCities);
    }
  }, [selectedCountry]);

  const nextStep = async () => {
    let valid = false;
    if (step === 1) {
      valid = await trigger(['firstName', 'lastName', 'dateOfBirth', 'country', 'city']);
    } else if (step === 2) {
      valid = await trigger(['socialNetwork1Type', 'socialNetwork1Username', 'socialNetwork2Type', 'socialNetwork2Username']);
    } else if (step === 3) {
      valid = await trigger(['postalCode', 'address']);
    }
    if (valid) {
      setStep(step + 1);
    }
  };

  const onSubmitForm = (data) => {
    const finalData = { ...data, phone, email };
    console.log('User data:', finalData);
    onSave(finalData);
  };

  const renderSocialIcon = (type) => {
    switch (type) {
      case 'skype':
        return <FaSkype className="social-icon" />;
      case 'facebook':
        return <FaFacebook className="social-icon" />;
      case 'instagram':
        return <FaInstagram className="social-icon" />;
      case 'whatsapp':
        return <FaWhatsapp className="social-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="header-area">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <h1>Profile info</h1>
        <p>Fill in the data for profile. It will take a couple of minutes.</p>
        <p>You only need a passport</p>
      </div>
      <div className="form-container">
        {step === 1 && (
          <div className="space-y-6">
            <label htmlFor="confirmationCode" className="block text-gray-700 mb-2">
              Personal date</label>
              <p>Specify exactly as in your passport</p>
            <div>
              <label htmlFor="firstName" className="block text-gray-700 mb-2">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Your Name"
                {...register('firstName', { required: "This field is required" })}
                className="line-input"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 mb-2">
                Second name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Your Last Name"
                {...register('lastName', { required: "This field is required" })}
                className="line-input"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                {...register('dateOfBirth', { required: "This field is required" })}
                className="line-input"
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
            <div>
              <label htmlFor="country" className="block text-gray-700 mb-2">
                Country
              </label>
              <select
                id="country"
                {...register('country', { required: "This field is required" })}
                className="line-input"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
            </div>
            <div>
              <label htmlFor="city" className="block text-gray-700 mb-2">
                City
              </label>
              <select
                id="city"
                {...register('city', { required: "This field is required" })}
                className="line-input"
              >
                <option value="">Select a city</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
            </div>
            
            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
            >
              Go Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6">
            <h2>Contacts</h2>
            <p>These contacts are used to inform about orders</p>
            <div className="info-line">
              <FaPhone className="social-icon" />
              <p1>Phone: {phone}</p1>
            </div>
            <div className="info-line">
              <FaEnvelope className="social-icon" />
              <p1>Email: {email}</p1>
            </div>
            <div>
              <h2>Social networks</h2>
              <p>Indicate the desired communication method</p>
            </div>
            <div className="social-input-container">
              <div style={{ flex: 1 }}>
                <select
                  id="socialNetwork1Type"
                  {...register('socialNetwork1Type', { required: "This field is required" })}
                  className="line-input"
                >
                  <option value="">Select social network</option>
                  <option value="skype">Skype</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
              <div style={{ flex: 0.3, textAlign: 'center' }}>
                {renderSocialIcon(watch('socialNetwork1Type'))}
              </div>
              <div style={{ flex: 2 }}>
                <input
                  id="socialNetwork1Username"
                  type="text"
                  placeholder="@profile"
                  {...register('socialNetwork1Username', { required: "This field is required" })}
                  className="line-input"
                />
              </div>
            </div>
            <div className="social-input-container">
              <div style={{ flex: 1 }}>
                <select
                  id="socialNetwork2Type"
                  {...register('socialNetwork2Type', { required: "This field is required" })}
                  className="line-input"
                >
                  <option value="">Select social network</option>
                  <option value="skype">Skype</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
              <div style={{ flex: 0.3, textAlign: 'center' }}>
                {renderSocialIcon(watch('socialNetwork2Type'))}
              </div>
              <div style={{ flex: 2 }}>
                <input
                  id="socialNetwork2Username"
                  type="text"
                  placeholder="@profile"
                  {...register('socialNetwork2Username', { required: "This field is required" })}
                  className="line-input"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
            >
              Go Next
            </button>
          </div>
        )}
        {step === 3 && (
  <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">

    <div>
    <h2>Delivery address</h2>
    <p>User fot shipping orders</p>
      <label htmlFor="address" className="block text-gray-700 mb-2">
        Address
      </label>
      <input
        id="address"
        type="text"
        placeholder="Enter address"
        {...register('address', { required: "This field is required" })}
        className="line-input"
      />
      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
    </div>
    <div>
      <label htmlFor="city" className="block text-gray-700 mb-2">
        City
      </label>
      <select
        id="city"
        {...register('city', { required: "This field is required" })}
        className="line-input"
      >
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
    </div>

    {/* Country and City code side by side */}
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ flex: 1 }}>
        <label htmlFor="country" className="block text-gray-700 mb-2">
          Country
        </label>
        <select
          id="country"
          {...register('country', { required: "This field is required" })}
          className="line-input"
          style={{ width: '100%' }}
        >
          <option value="">Select a country</option>
          {countries.map((cntr) => (
            <option key={cntr.code} value={cntr.code}>
              {cntr.name}
            </option>
          ))}
        </select>
        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
      </div>
      <div style={{ flex: 1 }}>
        <label htmlFor="postalCode" className="block text-gray-700 mb-2">
          Zip code
        </label>
        <input
          id="postalCode"
          type="text"
          placeholder="Enter code"
          {...register('postalCode', { required: "This field is required" })}
          className="line-input"
          style={{ width: '100%' }}
        />
        {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
    >
      Save
    </button>
  </form>
)} 
      </div>
    </div>
  );
}
export default ProfileInfoForm;
