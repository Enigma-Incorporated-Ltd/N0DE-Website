const instagramImages = [
  { src: "assets/img/ins-img-1.png", alt: "N0DE Instagram post 1" },
  { src: "assets/img/ins-img-2.png", alt: "N0DE Instagram post 2" },
  { src: "assets/img/ins-img-3.png", alt: "N0DE Instagram post 3" },
  { src: "assets/img/ins-img-4.png", alt: "N0DE Instagram post 4" },
  { src: "assets/img/ins-img-5.png", alt: "N0DE Instagram post 5" },
];

const InstagramHomeOne = () => {
  return (
    <div className="section-space-md-top section-space-bottom">
      <div className="section-space-sm-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="text-center text-light mb-0" data-cue="fadeIn">
                N0DE On Instagram
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center"
          data-cues="fadeIn"
        >
          {instagramImages.map((img, idx) => (
            <div className="col text-center" key={idx}>
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: "24px",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramHomeOne;
