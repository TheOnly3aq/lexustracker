import * as React from "react";
import {

  ImageList,
  ImageListItem,
} from "@mui/material";
import { PageContainer } from "@toolpad/core/PageContainer";

const itemData = [
  {
    img: "https://cdn.astrode.dev/lexustracker/1.jpg",
    title: "Lexus IS250C in het rood",
  },
  {
    img: "https://cdn.astrode.dev/lexustracker/2.jpg",
    title: "Lexus IS250C in het rood",
  },
  {
    img: "https://cdn.astrode.dev/lexustracker/4.jpg",
    title: "Lexus IS250C in het rood",
  },
  {
    img: "https://cdn.astrode.dev/lexustracker/5.jpg",
    title: "Lexus IS250C in het rood",
  },
  {
    img: "https://cdn.astrode.dev/lexustracker/6.jpg",
    title: "Lexus IS250C in het rood",
  },
  {
    img: "https://cdn.astrode.dev/lexustracker/7.jpg",
    title: "Lexus IS250C in het rood",
  },
  {
    img: "https://cdn.astrode.dev/lexustracker/8.jpg",
    title: "Lexus IS250C in het rood",
  },
  {
    img: "https://cdn.astrode.dev/lexustracker/9.jpg",
    title: "Lexus IS250C in het rood",
  },
  {
    img: "https://cdn.astrode.dev/lexustracker/10.jpg",
    title: "Lexus IS250C in het rood",
  },
  {
    img: "https://cdn.astrode.dev/lexustracker/11.jpg",
    title: "Lexus IS250C in het rood",
  },
];

export default function Photos() {
  return (
    <PageContainer>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </PageContainer>
  );
}
