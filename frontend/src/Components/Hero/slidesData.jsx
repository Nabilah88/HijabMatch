import visual from "../../assets/visual_mockup.png";
import color_recommend from "../../assets/hijab_colors.png";
import hijab_ladies from "../../assets/confident_hijabi2.jpg";

const slidesData = (navigate) => [
  {
    id: 1,
    heading: "Discover Which Hijab Colors Brighten Your Complexion",
    text: "Upload a photo and let AI analyze your skin tone, undertone, and contrast to find your best hijab colors.",
    ctaLabel: "Start Analysis",
    src: visual,
    tag1:"100% Privacy",
    tag2:"AI-powered",
  },
  {
    id: 2,
    heading: "Personalized Color Recommendations",
    text: "Find out your recommended hijab colors, which colors to avoid",
    ctaLabel: "Learn More",
    src:color_recommend,
    tag1:"Seasonal Skin Tone Analysis",
    tag2:"Curated Hijab Colors",
  },
  {
    id: 3,
    heading: "Feel More Confident in Your Color Choices",
    text: "Discover shades that enhance your natural beauty.",
    ctaLabel: "Try Now",
    src: hijab_ladies,
    tag1:"Confidence",
    tag2:"Enhance Features",
  },
];

export default slidesData;
