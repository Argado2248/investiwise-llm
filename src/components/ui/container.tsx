interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="w-full max-w-[68rem] mx-auto px-8">
      {children}
    </div>
  );
}