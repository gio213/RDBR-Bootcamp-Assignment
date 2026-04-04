interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="mx-auto max-w-391.5 flex flex-col gap-16 py-16 px-4">
      {children}
    </div>
  );
}
