export const capitalizeFirstChar = (label: string): string => {
  if (!label) return label;
  return label.charAt(0).toUpperCase() + label.slice(1);
};
