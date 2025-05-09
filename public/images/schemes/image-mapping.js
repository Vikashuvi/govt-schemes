/**
 * This file maps scheme categories to specific image files
 * Each scheme should have a unique, relevant image
 */

const schemeImageMapping = {
  // Agriculture and Farmer schemes
  "PM Kisan Samman Nidhi": "/images/schemes/agriculture-farmer-1.jpg",
  "PM-KISAN Credit Card": "/images/schemes/agriculture-farmer-2.jpg",
  
  // Housing schemes
  "Pradhan Mantri Awas Yojana (PMAY)": "/images/schemes/housing-1.jpg",
  
  // Entrepreneurship and Business schemes
  "Pradhan Mantri Mudra Yojana": "/images/schemes/entrepreneur-1.jpg",
  "Stand Up India": "/images/schemes/entrepreneur-2.jpg",
  "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)": "/images/schemes/entrepreneur-3.jpg",
  "Prime Minister's Employment Generation Programme (PMEGP)": "/images/schemes/entrepreneur-4.jpg",
  "Credit Linked Capital Subsidy Scheme (CLCSS)": "/images/schemes/entrepreneur-5.jpg",
  "Startup India Seed Fund Scheme": "/images/schemes/entrepreneur-6.jpg",
  "ZED (Zero Defect Zero Effect) Certification Scheme": "/images/schemes/entrepreneur-7.jpg",
  "A Scheme for Promotion of Innovation, Rural Industries and Entrepreneurship (ASPIRE)": "/images/schemes/entrepreneur-rural-1.jpg",
  "Pradhan Mantri Mudra Yojana (PMMY)": "/images/schemes/entrepreneur-8.jpg",
  
  // Women-focused schemes
  "Sukanya Samriddhi Yojana": "/images/schemes/women-1.jpg",
  "PM Ujjwala Yojana": "/images/schemes/women-2.jpg",
  "Trade Related Entrepreneurship Assistance and Development (TREAD) Scheme for Women": "/images/schemes/women-entrepreneur-1.jpg",
  
  // Pension and Senior Citizen schemes
  "PM Shram Yogi Maandhan": "/images/schemes/pension-1.jpg",
  "Pradhan Mantri Vaya Vandana Yojana": "/images/schemes/senior-citizen-1.jpg",
  "Atal Pension Yojana": "/images/schemes/pension-2.jpg",
  
  // Education and Student schemes
  "National Scholarship Portal": "/images/schemes/education-1.jpg",
  "PM Kaushal Vikas Yojana": "/images/schemes/skill-development-1.jpg",
};

// Default images by category (used as fallback)
const defaultCategoryImages = {
  "agriculture": "/images/schemes/agriculture-default.jpg",
  "farmer": "/images/schemes/agriculture-default.jpg",
  "housing": "/images/schemes/housing-default.jpg",
  "entrepreneur": "/images/schemes/entrepreneur-default.jpg",
  "business": "/images/schemes/entrepreneur-default.jpg",
  "women": "/images/schemes/women-default.jpg",
  "female": "/images/schemes/women-default.jpg",
  "pension": "/images/schemes/pension-default.jpg",
  "senior": "/images/schemes/senior-default.jpg",
  "education": "/images/schemes/education-default.jpg",
  "student": "/images/schemes/education-default.jpg",
  "skill": "/images/schemes/skill-default.jpg",
  "default": "/images/schemes/general-default.jpg"
};

export { schemeImageMapping, defaultCategoryImages };
