import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

const OAuthLogin = () => {
  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      window.location.href = `http://localhost:5000/api/auth/google?token=${credentialResponse.credential}`;
    } else {
      console.error("Google Login Failed");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.error("Google Login Failed")}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default OAuthLogin;
