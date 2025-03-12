import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
// Імпортуємо потрібні іконки з react-icons
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
    },
  });

  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  // Локальні дані для країн
  useEffect(() => {
    const dummyCountries = [
      { code: 'UA', name: 'Україна' },
      { code: 'US', name: 'США' },
      { code: 'GB', name: 'Велика Британія' },
    ];
    setCountries(dummyCountries);
  }, []);

  // Оновлення списку міст залежно від вибраної країни
  const selectedCountry = watch('country');
  useEffect(() => {
    if (selectedCountry) {
      let dummyCities = [];
      if (selectedCountry === 'UA') {
        dummyCities = [
          { id: 'kyiv', name: 'Київ' },
          { id: 'lviv', name: 'Львів' },
          { id: 'odessa', name: 'Одеса' },
        ];
      } else if (selectedCountry === 'US') {
        dummyCities = [
          { id: 'ny', name: 'New York' },
          { id: 'la', name: 'Los Angeles' },
          { id: 'chicago', name: 'Chicago' },
        ];
      } else if (selectedCountry === 'GB') {
        dummyCities = [
          { id: 'london', name: 'London' },
          { id: 'manchester', name: 'Manchester' },
        ];
      }
      setCities(dummyCities);
    }
  }, [selectedCountry]);

  // Функція переходу на наступний крок після валідації поточних полів
  const nextStep = async () => {
    let valid = false;
    if (step === 1) {
      valid = await trigger(['firstName', 'lastName', 'dateOfBirth', 'country', 'city']);
    } else if (step === 2) {
      valid = await trigger(['socialNetwork1Type', 'socialNetwork1Username', 'socialNetwork2Type', 'socialNetwork2Username']);
    } else if (step === 3) {
      valid = await trigger(['postalCode']);
    }
    if (valid) {
      setStep(step + 1);
    }
  };

  const onSubmitForm = (data) => {
    const finalData = { ...data, phone, email };
    console.log('Дані користувача:', finalData);
    onSave(finalData);
  };

  // Для динамічного відображення іконки соцмережі
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
      <div className="form-container">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Інформація профілю
        </h2>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 mb-2">
                Ім'я
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Ваше ім'я"
                {...register('firstName', { required: "Це поле обов’язкове" })}
                className="line-input"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 mb-2">
                Прізвище
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Ваше прізвище"
                {...register('lastName', { required: "Це поле обов’язкове" })}
                className="line-input"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-gray-700 mb-2">
                Дата народження
              </label>
              <input
                id="dateOfBirth"
                type="date"
                {...register('dateOfBirth', { required: "Це поле обов’язкове" })}
                className="line-input"
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
            </div>
            <div>
              <label htmlFor="country" className="block text-gray-700 mb-2">
                Країна
              </label>
              <select
                id="country"
                {...register('country', { required: "Це поле обов’язкове" })}
                className="line-input"
              >
                <option value="">Виберіть країну</option>
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
                Місто
              </label>
              <select
                id="city"
                {...register('city', { required: "Це поле обов’язкове" })}
                className="line-input"
              >
                <option value="">Виберіть місто</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
            >
              Далі
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Відображення телефону і емейлу з іконками */}
            <div className="info-line">
              <FaPhone className="social-icon" />
              <p>Телефон: {phone}</p>
            </div>
            <div className="info-line">
              <FaEnvelope className="social-icon" />
              <p>Email: {email}</p>
            </div>
            {/* Поля для соцмереж в один ряд */}
            <div className="social-input-container">
              <div style={{ flex: 1 }}>
                <select
                  id="socialNetwork1Type"
                  {...register('socialNetwork1Type', { required: "Це поле обов’язкове" })}
                  className="line-input"
                >
                  <option value="">Виберіть соц. мережу</option>
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
                  placeholder="Введіть логін/посилання"
                  {...register('socialNetwork1Username', { required: "Це поле обов’язкове" })}
                  className="line-input"
                />
              </div>
            </div>
            <div className="social-input-container">
              <div style={{ flex: 1 }}>
                <select
                  id="socialNetwork2Type"
                  {...register('socialNetwork2Type', { required: "Це поле обов’язкове" })}
                  className="line-input"
                >
                  <option value="">Виберіть соц. мережу</option>
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
                  placeholder="Введіть логін/посилання"
                  {...register('socialNetwork2Username', { required: "Це поле обов’язкове" })}
                  className="line-input"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
            >
              Далі
            </button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            <div>
              <p className="text-gray-700 mb-2">Місто: {watch('city')}</p>
              <p className="text-gray-700 mb-2">Країна: {watch('country')}</p>
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-gray-700 mb-2">
                Індекс міста
              </label>
              <input
                id="postalCode"
                type="text"
                placeholder="Введіть індекс"
                {...register('postalCode', { required: "Це поле обов’язкове" })}
                className="line-input"
              />
              {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
            >
              Зберегти
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfileInfoForm;
