export const formatClassName = (className: string): string => {
  const name = className.split(",")[0].trim();

  const formattedName = name.replace(/_/g, " ");

  return formattedName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
