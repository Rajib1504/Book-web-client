export interface HeadingProps {
  heading: string;
  subtitle: string;
}

const HeadingGenerator = ({ heading, subtitle }: HeadingProps) => {
  return (
    <div className="mb-4 sm:mb-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-black mb-2">{heading}</h1>
      <p className="text-gray-600 text-md sm:text-lg">{subtitle}</p>
    </div>
  );
};

export default HeadingGenerator;
