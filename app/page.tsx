import Navbar from "./components/Navbar/Navbar";
import HeaderSection from "./components/HeaderSection/HeaderSection";
import SectionTitle from "./components/SectionTitle/SectionTitle";
import BusSchedule from "./components/BusSchedule/BusSchedule";
import Footer from "./components/Footer/Footer";
import MapLoader from "./components/MapLoader/MapLoader";

// Import the new client-side loader component

export default function Home() {
  return (
    <div className="App">
      {/* شريط التنقل */}
      <Navbar />

      {/* العنوان الرئيسي */}
      <HeaderSection />

      {/* خريطة الباص */}
      <SectionTitle title="Active Bus Map" />
      {/* Use the MapLoader component here */}
      <MapLoader />

      {/* جدول مواعيد الباص */}
      <SectionTitle title="Bus Schedule" />
      <BusSchedule />

      {/* الفوتر */}
      <Footer />
    </div>
  );
}