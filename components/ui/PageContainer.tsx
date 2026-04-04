interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="mx-auto w-full max-w-391.5 px-4 sm:px-8 lg:px-44.25 flex flex-col gap-16 py-16">
      {children}
    </main>
  );
}
