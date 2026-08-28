import React from "react";

/* Auto-picks up every image dropped into these folders — no need to list
   filenames by hand, and new logos just work by adding a file. */
const row1Images = Object.values(
  import.meta.glob("../../assets/row1/*.{png,jpg,jpeg,webp,svg}", {
    eager: true,
    import: "default",
  })
);
const row2Images = Object.values(
  import.meta.glob("../../assets/row2/*.{png,jpg,jpeg,webp,svg}", {
    eager: true,
    import: "default",
  })
);
const row3Images = Object.values(
  import.meta.glob("../../assets/row3/*.{png,jpg,jpeg,webp,svg}", {
    eager: true,
    import: "default",
  })
);

function MarqueeRow({ images, direction = "left" }) {
  if (!images.length) return null;

  // Duplicate the strip so it can loop seamlessly at translateX(-50%).
  const doubled = [...images, ...images];
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={
          "flex items-center w-max " +
          animClass +
          " hover:[animation-play-state:paused]"
        }
      >
        {doubled.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="shrink-0 h-32 mob:h-24 w-auto object-contain"
          />
        ))}
      </div>
    </div>
  );
}

function GroupExposure() {
  return (
    <section className="py-[100px] bg-cream-2" id="group-exposure">
      <div className="wrap mb-14">
        <div className="max-w-[720px] mx-auto text-center">
          <span className="eyebrow justify-center">Our Network</span>
          <h2 className="text-teal-900 text-[clamp(2rem,4vw,2.7rem)] mt-4">
            Group Exposure
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <MarqueeRow images={row1Images} direction="left" />
        <MarqueeRow images={row2Images} direction="right" />
        <MarqueeRow images={row3Images} direction="left" />
      </div>
    </section>
  );
}

export default GroupExposure;