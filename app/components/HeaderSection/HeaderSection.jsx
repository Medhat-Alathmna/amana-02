import "./HeaderSection.css";

function HeaderSection() {
  return (
    <header  style={{
    width: "100%",
    maxWidth: "1200px",   // عرض أقصى
    margin: "0 auto",     // margin يمين ويسار أوتوماتيك
    padding: "0 16px",    // padding داخلي
  }} className="header-section">
      <h1>Amana Transportation</h1>
      <p>Proudly Servicing Malaysian Bus Riders Since 2019!</p>
    </header>
  );
}

export default HeaderSection;
