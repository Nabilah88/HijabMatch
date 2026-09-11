// data/faqData.js
export const faqData = [
  {
    id: 1,
    title: "How do I upload a photo?",
    category: "Getting Started",
    content:"You can upload your photo on our HijabMatch form for our AI to analyze it",
    link: "/analyze"
  },
  {
    id: 2,
    title: "How does undertone detection work?",
    category: "AI Features",
    content:"We use AI skintone analysis",
    link: "/faq#skin-tone"
  },
  {
    id: 3,
    title: "Where can I see my results?",
    category: "Results",
    content:"You can only see your result right after you submit your info and your photo on analyze",
    link: "/analyze"
  },
    {
    id: 4,
    title: "What is a color season?",
    category: "Seasonal color",
    content:"Seasonal color analysis is a method that helps individuals identify which colors complement their natural features, enhancing their overall appearance and personal style.",
    link: "/faq#color-season"
  },
     {
    id: 5,
    title: "Do I need to wear makeup for the analysis?",
    category: "Seasonal color",
    content:" No. For the most accurate reading, we recommend taking the photo with minimal or no makeup so your natural undertone is visible.",
    link: "/faq#makeup"
  },

];
export const faqProperties = {
  title: { label: 'Title', search: true },
  category: { label: 'Category', search: true },
  content: { label: 'Content', search: true },
};

export default faqData;