import React, { useState, useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Banner from './components/Banner/Banner.jsx';
import Hero from './components/Hero/Hero';
import WhyChoose from './components/WhyChoose/WhyChoose.jsx';
import About from './components/About/About.jsx';
import Footer from './components/Footer/Footer.jsx';
import Popup from './components/Popup/Popup.jsx';
import SignPopup from './components/SignPopup/SignPopup.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Dashboardu from './components/Dashboardu/Dashboardu.jsx';
import Dashboards from './components/Dashboards/Dashboards.jsx';
import Dashboarda from './components/Dashboarda/Dashboarda.jsx';
import AdddishesPopout from './components/AdddishesPopout/AdddishesPopout.jsx';
import Screening from './components/Screening/Screening.jsx';
import Availablemeal from './components/Availablemeal/Availablemeal.jsx';
import Removemeal from './components/Removemeal/Removemeal.jsx';
import Addsubs from './components/Addsubs/Addsubs.jsx';
import Removesubs from './components/Removesubs/Removesubs.jsx';
import Viewsubs from './components/Viewsubs/Viewsubs.jsx';
import Checkmeal from './components/Checkmeal/Checkmeal.jsx';
import AddCart from './components/AddCart/AddCart.jsx';
import ViewCart from './components/ViewCart/ViewCart.jsx';
import Pay from './components/Pay/Pay.jsx';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [showAdddishesPopout, setShowPopup2] = useState(false);
  const [showScreeningPopout, setShowPopup3] = useState(false);
  const [showAvailablemeal, setShowPopup4] = useState(false);
  const [mealData, setMealData] = useState([]);
  const [sellername, setSellerName]=useState(false);
  const [showRemovemeal, setShowPopup5]=useState(false);
  const [showAddsubs, setShowPopup6]= useState(false);
  const [showRemovesubs, setShowPopup7]= useState(false);
  const [showViewsubs, setShowPopup8]= useState(false);
  const [planData, setplanData] = useState([]);
  const [showCheckmeal, setShowPopup9]=useState(false);
  const [mealData2, setMealData2] = useState([]);
  const [cart, setCartData]=useState([]);
  const [cart2, setCartData2]=useState([]);
  const [showViewcart, setShowPopup10]=useState(false);
  const [username, setUserName]=useState([]);
  const [showPay, setShowPopup11]=useState(false);


  const HandlePopup = () => {
    setShowPopup(true);
  };

  const HandlePopup1 = () => {
    setShowPopup1(true);
  };

  const HandlePopup2 = () => {
    setShowPopup2(true);
  };

  const HandlePopup3 = () => {
    setShowPopup3(true);
  };

  const HandlePopup4 = () => {
    setShowPopup4(true);
  };

  const HandlePopup5 = () =>{
    setShowPopup5(true);
  };

  const HandlePopup6 =()=>{
    setShowPopup6(true);
  };

  const HandlePopup7 =()=>{
    setShowPopup7(true);
  };
  
  const HandlePopup8 =()=>{
    setShowPopup8(true);
  };

  const HandlePopup9 =()=>{
    setShowPopup9(true);
  };

  const HandlePopup10=()=>{
    setShowPopup10(true);
  };

  const HandlePopup11=()=>{
    setShowPopup11(true);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setUserId(null);
    setUserType(null);
    console.log('Logout logic here');
    navigate('/');
  };

  const handleLogin = (userId, userType) => {
    setUserId(userId);
    setUserType(userType);
    console.log('Logged in userId:', userId, 'and user type is:', userType);
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }, []);

  const renderDashboard = () => {
    switch (userType) {
      case 'User':
        return (
          <>
            <Dashboardu userId={userId} HandlePopup9={HandlePopup9} HandlePopup10={HandlePopup10} HandlePopup11={HandlePopup11} setUserName={setUserName} cart2={cart2} mealData2={mealData2} setCartData={setCartData} handleLogout={handleLogout} /> 
            <Checkmeal showCheckmeal={showCheckmeal} setShowPopup9={setShowPopup9} setMealData2={setMealData2} />
            <AddCart cart={cart}/>
            <ViewCart showViewcart={showViewcart} setShowPopup10={setShowPopup10} setCartData2={setCartData2} username={username} />
            <Pay showPay={showPay} setShowPopup11={setShowPopup11} username={username} />
          </>
        );
      case 'Seller':
        return (
          <>
            <Dashboards 
              userId={userId} 
              HandlePopup2={HandlePopup2} 
              HandlePopup3={HandlePopup3} 
              HandlePopup4={HandlePopup4} 
              HandlePopup5={HandlePopup5}
              HandlePopup6={HandlePopup6}
              HandlePopup7={HandlePopup7}
              HandlePopup8={HandlePopup8}
              handleLogout={handleLogout}
              mealData={mealData}
              planData={planData}
              setSellerName={setSellerName}
            />
            <AdddishesPopout showAdddishesPopout={showAdddishesPopout} setShowPopup2={setShowPopup2} sellername={sellername} />
            <Removemeal showRemovemeal={showRemovemeal} setShowPopup5={setShowPopup5} sellername={sellername}/>
            <Screening showScreeningPopout={showScreeningPopout} setShowPopup3={setShowPopup3} />
            <Availablemeal showAvailablemeal={showAvailablemeal} setShowPopup4={setShowPopup4} setMealData={setMealData} sellername={sellername}/>
            <Addsubs showAddsubs={showAddsubs} setShowPopup6={setShowPopup6} sellername={sellername} />
            <Removesubs showRemovesubs={showRemovesubs} setShowPopup7={setShowPopup7} sellername={sellername} />
            <Viewsubs showViewsubs={showViewsubs} setShowPopup8={setShowPopup8} setplanData={setplanData} sellername={sellername}/>
          </>
        );
      case 'Admin':
        return (
          <>
            <Dashboarda userId={userId} handleLogout={handleLogout} HandlePopup9={HandlePopup9}/>
          </>
        );
      default:
        return <div>No valid user type provided.</div>;
    }
  };

  return (
    <div className="overflow-x-hidden">
      {userId ? (
        <div style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}>
          {renderDashboard()}
        </div>
      ) : (
        <>
          <Navbar HandlePopup={HandlePopup} HandlePopup1={HandlePopup1} />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About HandlePopup={HandlePopup} />} />
            <Route path="/contact" element={<Footer />} />
          </Routes>
          <Banner />
          <WhyChoose />
          <About HandlePopup={HandlePopup}/>
          <Banner />
          <Footer />
        </>
      )}
      <Popup showPopup={showPopup} setShowPopup={setShowPopup} handleLogin={handleLogin} />
      <SignPopup showPopup1={showPopup1} setShowPopup1={setShowPopup1} />
    </div>
  );
};

export default App;
