import Hero from '../components/Hero';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const LandingScreen = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/home');
    }
  }, [navigate, userInfo]);
  return <Hero />;
};
export default LandingScreen;
