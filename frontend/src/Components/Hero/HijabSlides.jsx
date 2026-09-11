import Hijab_girl from "../../assets/hijab1.jpg";
import Hijabdiversse from "../../assets/hijab_ladies.jpg";
import Hijab_match from "../../assets/happyhijab.jpg";


const HijabSlides = (navigate) => [
  {
    src: Hijab_match,
    title: "Find the Hijab Colors That Brighten Your Complexion",
    subtitle: "AI-powered analysis of your skin tone, undertone, and contrast",
    button: "Start Analysis",
    onClick: () => navigate("/analyze"),
  },
  {
    src: Hijabdiversse,
    title: "Personalized Color Recommendations",
    subtitle: "How we match your skin tone based on the color of hijab",
    button: "Find Out",
    onClick: () => {
  document.getElementById('how-it-works')?.scrollIntoView({ 
    behavior: 'smooth' 
  });

  },
  },
  {
    src: Hijab_girl,
    title: "Be the better version of you",
    subtitle: "Noor will guide you",
    button: "Start Exploring",
    onClick: () => navigate("/explore"),

  },
];

export default HijabSlides;