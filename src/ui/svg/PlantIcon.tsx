const PlantIcon = ({ active }: { active: boolean }) => {
  return (
    <div className="relative z-10" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" fill={active ? "var(--color-primary)" : "var(--color-plant-bg)"} />
        <path
          d="M14 20v-8M10 15c0-2.2 1.8-4 4-4s4 1.8 4 4"
          stroke={active ? "var(--color-white)" : "var(--color-plant-stroke)"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M11 18c1-1.5 2-2 3-2s2 .5 3 2"
          stroke={active ? "var(--color-white)" : "var(--color-plant-stroke)"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default PlantIcon;
