import Image from "next/image";
import Head from 'next/head';
import styles from './login.css';


export default function Home() {
  
  return (
    <div className="w-screen h-screen bg-emerald-100 flex flex-col items-center">
      <div className = "logo">
        <Image
        src="/images/path-pilot.png"
        alt="PathPilot Logo"
        width={300} 
        height={100} 
      />
      </div>
      <div className="login">
        <div className="login-category">
          <button className="admin">Admin</button>
          <button className="driver">Driver</button>
        </div>
        <div className="login-inputs">
        <input
          type="text"
          placeholder="Name"
          className="name-input"
        />
        <input
          type="email"
          placeholder="Email"
          className="email-input"
        />
        <input
          type="password"
          placeholder="Password"
          className="password-input"
        />
        </div>

        <button className="login main-login">Login</button>

        <div className="forgot-password">Forgot password?</div>
        
      </div>

    </div>
  );
}
