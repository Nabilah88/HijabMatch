import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToHash from "./ScrollToHash";   
import Hero from "./Components/Hero/Hero";
import HijabSlides from './Components/Hero/HijabSlides';
import NavBar from './Components/Navbar/NavBar';
import Info_1 from './Components/Info1/Info_1';
import Steps from './Components/Steps/Steps';
import FirstFeature from './Components/Features/First_feature';
import SecondFeature from './Components/Features/Second_Feature';
import ThirdFeature from './Components/Features/Third_Feature';
import TitleFeature from './Components/Features/Title_Feature';

import Footer from './Components/Footer/Footer';
import UserForm from './Components/Form/User';
import Results from './Components/Form/Results';
import Testimonials from './Components/Info1/Testimonials';
import About_Us from './Components/Company/About_Comp';
import Contact from './Components/Company/Contact_Comp';
import FAQ from './Components/Company/FAQ';
import Help_Center from './Components/Company/SearchPage';
import Privacy from './Components/Company/Privacy';
/*import Test_Hero from './Components/Hero/Hero_HijabMatch';*/
import Hero_again from './Components/Hero/Hero_Carousel'
import HijabMatchResult from './Components/Form/HijabMatchResult';

import { Box } from "grommet";

const App = () => {
  return (
    <Box direction="column" gap="medium">
    <Router>
      <NavBar />
      <ScrollToHash />  


      <Box>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero_again/>
                 <Box id="how-it-works">
                  <Steps />
                </Box>
                <FirstFeature />
                <SecondFeature />
                <ThirdFeature />
                <Testimonials />

               
              </>
            }
          />

          <Route path="/analyze" element={<UserForm />} />
          <Route path="/results" element={<Results />} />
          <Route path="/aboutus" element={<About_Us />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help" element={<Help_Center />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/hijab-match-result" element={<HijabMatchResult />} />
        </Routes>
      </Box>

      <Footer />
    </Router>
    </Box>
  );
};

export default App;
