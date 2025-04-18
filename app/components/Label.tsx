type Color = "BLUE" | "GREEN" | "YELLOW" | "RED";

type ColorMap = {
  normal: Record<Color, string>;
  hover: Record<Color, string>;
};

export default function Label({
  color = "BLUE",
  text,
}: {
  color?: Color;
  text: string;
}) {
  const colorMap: ColorMap = {
    normal: {
      BLUE: "bg-blue-500",
      GREEN: "bg-green-500",
      YELLOW: "bg-yellow-500",
      RED: "bg-red-500",
    },
    hover: {
      BLUE: "hover:bg-blue-400",
      GREEN: "hover:bg-green-400",
      YELLOW: "hover:bg-yellow-400",
      RED: "hover:bg-red-400",
    },
  };

  return (
    <span
      className={`text-white text-xs font-semibold px-2 py-1 rounded-md w-fit ${colorMap.normal[color]} ${colorMap.hover[color]} transition-all duration-300 select-none`}
    >
      {text}
    </span>
  );
}
