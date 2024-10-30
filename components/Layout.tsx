import { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <div className="container mx-auto">
      <header className="my-8 w-full text-center font-bold text-2xl">
        RatingsMania🫶
      </header>
      <main>{children}</main>
    </div>
  );
}
