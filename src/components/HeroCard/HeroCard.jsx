import "./heroCard.css";

function HeroCard({ children, className = "" }) {
  return (
    <section className={`heroCard ${className}`}>
      <div className="heroContent">{children}</div>
    </section>
  );
}

export default HeroCard;

/*
1. This is a reusable wrapper component for the orange hero section.
2. It keeps layout and styling consistent across pages.
3. Each page can pass its own content inside using {children}.
4. className allows pages to add custom layout when needed.
*/