import * as React from "react";
import { ImageList, ImageListItem, CircularProgress, Box } from "@mui/material";
import { PageContainer } from "@toolpad/core/PageContainer";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import content from "../assets/content.json";

export default function Photos() {
  const cols = 3;
  const baseDelay = 0.18; 
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

  if (isMobile) {
    return (
      <PageContainer>
        <title>Fotos | LexusTracker</title>
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {itemData.map((item) => (
            <SwiperSlide className="mt-4" key={item.img}>
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
            </SwiperSlide>
          ))}
        </Swiper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <title>Fotos | LexusTracker</title>
      <ImageList variant="masonry" cols={cols} gap={8} className="!m-0">
        {itemData.map((item, idx) => {
          const row = Math.floor(idx / cols);
          const delay = row * baseDelay;
          return (
            <motion.div
              key={item.img}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay, duration: 0.4 }}
            >
              <ImageListItem className="!p-0">
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
