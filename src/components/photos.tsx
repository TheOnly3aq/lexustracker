import * as React from "react";
import { ImageList, ImageListItem, CircularProgress, Box } from "@mui/material";
import { PageContainer } from "@toolpad/core/PageContainer";
import { motion } from "framer-motion";
import Slider from "react-slick";
import useMediaQuery from "@mui/material/useMediaQuery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import content from "../assets/content.json";

export default function Photos() {
  const cols = 3; // Number of columns in the masonry grid
  const baseDelay = 0.18; // Base delay between images
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
      <Box
        position="relative"
        width="100%"
        minHeight={200}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {!loaded && !error && (
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={1}
          >
            <CircularProgress />
          </Box>
        )}
        {error ? (
          <Box
            width="100%"
            height={200}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#eee"
            borderRadius={2}
          >
            <span style={{ color: "#888" }}>Image kon niet geladen worden</span>
          </Box>
        ) : (
          <img
            src={src}
            srcSet={srcSet}
            alt={alt}
            loading="lazy"
            style={{
              ...style,
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.3s",
              borderRadius: 8,
              width: "100%",
              display: "block",
            }}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}
      </Box>
    );
  }

  if (isMobile) {
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      adaptiveHeight: true,
    };
    return (
      <PageContainer>
        <title>Fotos | LexusTracker</title>
        <Slider {...sliderSettings}>
          {itemData.map((item, idx) => (
            <div key={item.img}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.4 }}
              >
                <PhotoWithLoader
                  src={`${item.img}?w=600&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=600&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                />
              </motion.div>
            </div>
          ))}
        </Slider>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <title>Fotos | LexusTracker</title>
      <ImageList variant="masonry" cols={cols} gap={8}>
        {itemData.map((item, idx) => {
          const row = Math.floor(idx / cols);
          const col = idx % cols;
          const delay = row * baseDelay;
          return (
            <motion.div
              key={item.img}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay, duration: 0.4 }}
            >
              <ImageListItem>
                <PhotoWithLoader
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                />
              </ImageListItem>
            </motion.div>
          );
        })}
      </ImageList>
    </PageContainer>
  );
}
