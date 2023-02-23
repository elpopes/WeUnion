import React from "react";

function DemoUser({ onCredentialChange, onPasswordChange }) {
  const handleDemoUser = () => {
    onCredentialChange("demo-user@appacademy.io");
    onPasswordChange("starwars");
  };

  return (
    <button type="button" onClick={handleDemoUser}>
      Demo User
    </button>
  );
}

export default DemoUser;
