import { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <div className="container px-2 mx-auto">
      <header className="my-8 w-full text-center font-bold text-2xl">
        RatingsMania🫶
      </header>
      <main className="min-h-screen">{children}</main>
      <footer className="text-center">
        Made with ❤️ by{" "}
        <a className="link" href="https://github.com/af4oz">
          @af4oz
        </a>
      </footer>
    </div>
  );
}
