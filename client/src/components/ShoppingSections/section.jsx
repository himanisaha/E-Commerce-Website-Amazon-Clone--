const Section = ({ title, items }) => {
  return (
    <section className="shopping-section">
      <h2 className="section-title">{title}</h2>

      <div className="section-grid">
        {items.map((item, index) => (
          <div className="section-item" key={index}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section