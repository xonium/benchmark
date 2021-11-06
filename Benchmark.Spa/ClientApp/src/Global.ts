import { Gutter } from "antd/lib/grid/row";
import { Options } from "react-youtube";

export const VideoOptions: Options = {
    height: "220",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

export const BenchmarkGutter: [Gutter, Gutter] = [16, { xs: 8, sm: 16, md: 16, lg: 16 }]