import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.light,
    fontSize: 14,
    fontFamily: Platform.OS === "android" ? "NotoSans" : "Avenir",
  },
};
