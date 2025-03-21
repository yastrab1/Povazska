const styles = {
  // General Container
  container: "relative max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg overflow-hidden",
  backgroundOverlay: "absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 opacity-50",
  titleSection: "text-center mb-4",
  title: "text-2xl font-bold text-gray-800",
  subtitle: "text-gray-500",


  // Upload Field
  uploadField: "flex flex-col items-center justify-center p-4 bg-gray-100 border border-gray-300 rounded-xl shadow-sm cursor-pointer hover:border-gray-400 transition",
  uploadIcon: "text-gray-500 text-4xl",
  uploadText: "text-gray-600 mt-2 font-medium",
  uploadSubtext: "text-sm text-gray-400",

  // Image Grid
  imageGrid: "grid grid-cols-3 gap-3 mt-4",
  imageWrapper: "relative group",
  image: "w-full h-24 object-cover rounded-lg shadow-md",
  deleteButton: "absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-sm opacity-0 group-hover:opacity-100 transition",

  // Photo Tips
  photoTip: "mt-4 p-4 bg-gray-100 rounded-lg flex items-start gap-3",
  tipIcon: "text-gray-500 text-2xl",
  tipText: "font-semibold text-gray-700",
  tipDetail: "text-sm text-gray-500",

  // Location Section
  locationContainer: "relative w-full max-w-lg mx-auto bg-white rounded-2xl shadow-lg overflow-hidden p-6",
  locationBox: "flex items-center p-4 bg-gray-100 rounded-lg shadow-sm",
  locationIcon: "text-3xl text-secondary",
  locationInfo: "ml-3",
  locationTitle: "text-lg font-semibold",
  locationDescription: "text-sm text-gray-600",

  // Search Field
  searchContainer: "relative",
  searchLabel: "flex items-center px-4 py-3 bg-gray-200 rounded-lg shadow-sm",
  searchIcon: "text-xl text-gray-500",
  searchText: "ml-2 text-gray-600",
  searchInput: "w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary",

  // Map
  mapContainer: "relative w-full h-64 rounded-lg overflow-hidden shadow-md",
  mapOverlay: "absolute inset-0 bg-black bg-opacity-10 z-10",
  mapMarker: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20",

  // Buttons
  buttonContainer: "mt-6 flex justify-between",
  backButton: "flex items-center text-gray-600 hover:text-gray-900 transition",
  nextButton: "flex items-center bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary transition",
  fullWidthButton: "w-full py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary transition",

  // Progress Bar
  progressBarContainer: "w-full bg-gray-200 h-2 rounded-full mt-4 relative",
  progressBar: "bg-secondary h-2 rounded-full w-3/5",

  formTip: "flex items-start p-4 bg-gray-100 rounded-lg shadow-sm mb-5",
  formTipIcon: "text-4xl text-secondary",
  formTipTitle: "text-lg font-semibold",
  formTipText: "text-sm text-gray-600",

  formLabel: "flex items-center text-gray-700 font-semibold",
  formIcon: "text-xl mr-2",
  formField: "mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary",

 
  footer: "mt-5 text-sm text-gray-600 text-center",



  // Category Selection
  categoryContainer: "flex flex-wrap gap-2 justify-center",
  categoryButton: "px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 shadow-sm",
  categorySelected: "bg-secondary text-white border-secondary shadow-md scale-105",
  categoryUnselected: "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:shadow-md",


  issueCard: "max-w-md mx-auto mt-8 p-6 shadow-lg border border-black bg-[#00A84E] text-white rounded-xl font-petrzalka",

  issueTags: "text-xl font-bold tracking-wide text-white",
  issueDescription: "text-sm text-gray-200",

  inputField:
    "w-full h-12 rounded-lg border border-black px-4 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-[#00A84E] focus:outline-none",

  textarea:
    "w-full h-24 rounded-lg border border-black px-4 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-[#00A84E] focus:outline-none",
  formDescription: "text-sm text-gray-300",

  separator: "my-4 border-gray-400",
  duplicateTitle: "text-lg font-semibold text-white mt-4",

  uploadButton:
    "w-full h-12 bg-black text-white font-bold rounded-lg shadow-md hover:bg-gray-800 transition-all duration-200",
    card: "max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-xl border border-gray-200",
    cardPrimary: "bg-[#00A84E] text-white border-black shadow-lg font-petrzalka",
  
    // Card Header
    cardHeader: "mb-4",
    cardTitle: "text-xl font-semibold",
    cardTitleInput: "w-full h-12 rounded-md border border-black px-4 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-[#00A84E] focus:outline-none",
    cardDescription: "text-sm text-gray-500",
  
    // Form Styles
    formTextarea: "w-full h-24 rounded-md border border-black px-4 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-[#00A84E] focus:outline-none",
  
    // Image & Duplicates Section
    sectionTitle: "text-lg font-semibold mt-4",
  
    // Carousel Styles
    carouselContainer: "relative",
    carouselItem: "p-2",
    
    // Button Styles
    buttonPrimary: "w-full h-12 bg-secondary text-white font-bold rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed",


  // User Info Box
  userInfoContainer: "p-3 bg-gray-100 rounded-lg shadow-sm flex flex-col items-start",
  userName: "text-lg font-semibold text-gray-800",
  userEmail: "text-sm text-gray-500",

  // Tag Styling
  tagContainer: "flex flex-wrap gap-2 mt-3",
  tagPill: "bg-secondary text-white text-sm font-medium px-3 py-1 rounded-full shadow-md",
  noTagsText: "text-sm text-gray-500 italic",

  formContainer: "bg-white p-5 rounded-lg shadow-md",

  // Form Header
  formHeader: "mb-4 text-center",
  formTitle: "text-lg font-semibold text-gray-800",
  formSubtitle: "text-sm text-gray-500",

  // Textarea Styling
 
  // Image Carousel Container (prevents overflow)
  imageCarouselContainer: "relative w-full max-w-md overflow-hidden rounded-lg shadow-md",

  // Image Wrapper
  imageWrappercar: "flex justify-center items-center w-full",

  // Image Styling (consistent size & aspect ratio)
  imagecar: "rounded-lg object-cover w-full h-[250px] shadow-lg",

  // Navigation Buttons
  carouselButton: "absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition",

  // Placeholder for No Image
  noImageBox: "w-full max-w-md h-48 bg-gray-100 flex items-center justify-center rounded-md mb-4 cursor-pointer",
  noImageText: "text-gray-500",
  
  // Input Field
};
 


export default styles