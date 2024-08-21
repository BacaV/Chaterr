import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import animationData from "@/assets/Pulser.json"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const defaultAnimation = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}