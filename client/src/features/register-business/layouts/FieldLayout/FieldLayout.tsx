import { ReactNode } from 'react';

export default function FieldLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-12 mb-16 grid-cols-2 items-start gap-5 md:my-24 md:grid lg:grid-cols-[2fr_3fr] lg:gap-24">
      {children}
    </div>
  );
}
