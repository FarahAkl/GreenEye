interface IProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const Spinner = ({ size = 'lg', color = 'border-primary' }: IProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div
      className={`${sizeClasses[size]} ${color} animate-spin rounded-full border-t-transparent`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
