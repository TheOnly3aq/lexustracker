import { CircularProgress } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PageContainer } from "@toolpad/core/PageContainer";
import * as React from "react";
import content from "../../../assets/content.json";
import Masonry from "../../ExternalComponents/Masonry/Masonry";

export default function Photos() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const itemData = content.photos;

  function PhotoWithLoader({
    src,
    srcSet,
    alt,
    style,
  }: {
    src: string;
    srcSet?: string;
    alt: string;
    style?: React.CSSProperties;
  }) {
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    return (
      <div className="relative w-full min-h-[200px] flex items-center justify-center">
        {!loaded && !error && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
            <CircularProgress />
          </div>
        )}
        {error ? (
          <div className="w-full h-[200px] flex items-center justify-center bg-gray-100 rounded-lg">
            <span className="text-gray-400">Image kon niet geladen worden</span>
          </div>
        ) : (
          <img
            src={src}
            srcSet={srcSet}
            alt={alt}
            loading="lazy"
            className={`rounded-lg w-full block transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            style={style}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}
      </div>
    );
  }

  return (
    <PageContainer>
      <title>Fotos | LexusTracker</title>
      <Masonry
        items={itemData}
        ease="power3.out"
        duration={0.2}
        stagger={0}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={false}
        colorShiftOnHover={false}
        columns={isMobile ? 1 : 3}
      />
    </PageContainer>
  );
}
