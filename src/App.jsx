import React from 'react';
import RegistrationForm from './RegistrationForm';
import ProfileInfoForm from './ProfileInfoForm';

function App() {
  const [registrationData, setRegistrationData] = React.useState(null);

  const handleRegistrationComplete = (data) => {
    console.log('Registration data:', data);
    setRegistrationData(data);
  };

  const handleProfileSave = (profileData) => {
    const fullUserData = { ...registrationData, ...profileData };
    console.log('Full user data:', fullUserData);
  };

  return (
    <div className="container"> {/* Додаємо клас */}
      {!registrationData ? (
        <RegistrationForm onComplete={handleRegistrationComplete} />
      ) : (
        <ProfileInfoForm 
          onSave={handleProfileSave} 
          phone={registrationData.phone} 
          email={registrationData.email} 
        />
      )}
    </div>
  );
}

export default App;
