const DiscordSection = () => {
  return (
    <section className="discord-widget py-4">
      <div className="container px-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="discord-widget__card">
              <iframe
                title="Discord Widget"
                src="https://discord.com/widget?id=1322195104236175370&theme=dark"
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscordSection;
