export default function Loader({ hidden }) {
  const text = "Crafting Experiences";
  return (
    <div className={`loader ${hidden ? "hidden" : ""}`} id="loader">
      <div className="loader-inner">
        <div className="loader-logo"><span>Tashu </span><span>Malviya</span></div>
        <div className="loader-bar"><div className="loader-fill" /></div>
        <div className="loader-text">
          {text.split("").map((c, i) => (<span key={i}>{c === " " ? "\u00A0" : c}</span>))}
        </div>
      </div>
    </div>
  );
}
