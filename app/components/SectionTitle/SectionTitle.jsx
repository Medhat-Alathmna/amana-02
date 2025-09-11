import "./SectionTitle.css";

function SectionTitle({ title }) {
  return (
    <div  style={{
    width: "100%",
    maxWidth: "1200px",   // عرض أقصى
    margin: "0 auto",     // margin يمين ويسار أوتوماتيك
    padding: "0 16px",    // padding داخلي
  }} className="section-title">
      <h2>{title}</h2>
    </div>
  );
}

export default SectionTitle;
