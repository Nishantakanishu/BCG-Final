import cement from "../assets/cement.jpeg"
import rice from "../assets/rice.jpg"
import lamb from "../assets/lamb.webp"
import websiteImg from "../assets/website.png"
import mobileImg from "../assets/mobile.png"
import renewableEnergyImg from "../assets/renewable_energy.png"
import agricultureMachineryImg from "../assets/agriculture_machinery.png"

export const imageMap = {
  "cement.jpeg": cement,
  "rice.jpg": rice,
  "lamb.webp": lamb,
  "website.jpg": websiteImg,
  "mobile.jpg": mobileImg,
  "renewable_energy.png": renewableEnergyImg,
  "agriculture_machinery.png": agricultureMachineryImg,
};

const products = [
  {
    name: "Clinker & Cement",
    url: cement,
    shortDesc:
      "High-strength clinker and cement for reliable large-scale construction projects.",
    longDesc:
      "High-performance clinker and cement manufactured under strict quality control standards to meet the demands of modern construction. Offers excellent binding strength, durability, and resistance to harsh weather conditions. Widely used in residential buildings, commercial structures, road construction, and infrastructure projects. Available in bulk quantities with consistent quality to support uninterrupted project execution."
  },
  {
    name: "Rice",
    url: rice,
    shortDesc:
      "Premium bulk rice with uniform grains, rich aroma, and dependable supply.",
    longDesc:
      "Carefully sourced bulk rice from trusted farms and processing units to ensure superior quality and freshness. Processed using modern milling techniques to preserve natural taste, aroma, and nutritional value. Ideal for wholesalers, hotels, caterers, food processing industries, and exporters. Consistent grain size, low breakage, and reliable large-volume availability make it a cost-effective and trusted choice."
  },
  {
    name: "Fresh Chilled Lamb Meat",
    url: lamb,
    shortDesc:
      "Hygienically processed fresh lamb meat supplied with cold-chain assurance.",
    longDesc:
      "Freshly processed and chilled lamb meat handled under strict hygienic and temperature-controlled conditions. Maintains natural tenderness, juiciness, and authentic flavor while meeting food safety standards. Suitable for restaurants, meat distributors, catering businesses, and export markets. Bulk supply with proper cold-chain handling ensures freshness, quality, and customer satisfaction."
  },
  {
    name: "Renewable Energy Solutions",
    url: renewableEnergyImg,
    shortDesc:
      "Solar panels, wind turbines, and energy storage systems for sustainable power generation.",
    longDesc:
      "Comprehensive renewable energy products including high-efficiency solar photovoltaic panels, vertical-axis wind turbines, and advanced battery energy storage systems. Sourced from certified global manufacturers, our renewable energy solutions cater to residential, commercial, and industrial applications. We offer end-to-end supply including procurement, quality inspection, and logistics support. Ideal for governments, energy developers, EPC contractors, and businesses transitioning to clean energy. All products comply with international IEC and ISO standards for safety and performance."
  },
  {
    name: "Agriculture Machinery",
    url: agricultureMachineryImg,
    shortDesc:
      "Modern tractors, harvesters, and precision farming equipment for high-yield agriculture.",
    longDesc:
      "A wide range of modern agriculture machinery including powerful tractors, combine harvesters, seed drills, irrigation systems, and precision farming tools. Our machinery is sourced from globally recognized manufacturers ensuring durability, fuel efficiency, and ease of maintenance. Suitable for large-scale farms, agri-businesses, cooperatives, and government agricultural programmes. We provide complete procurement support, pre-shipment inspections, and after-sales documentation to ensure seamless delivery across international markets."
  },
  {
    name: "Website Development",
    url: websiteImg,
    shortDesc: "Professional, responsive, scalable, and SEO-friendly websites built using modern technologies.",
    longDesc: "Professional, responsive, scalable, and SEO-friendly websites built using modern technologies."
  },
  {
    name: "Mobile App Development",
    url: mobileImg,
    shortDesc: "Cross-platform and native mobile application development for Android and iOS with modern UI/UX.",
    longDesc: "Cross-platform and native mobile application development for Android and iOS with modern UI/UX."
  }
];

export default products;