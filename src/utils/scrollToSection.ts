export const scrollToSection = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  id: string,
) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
  });
};
