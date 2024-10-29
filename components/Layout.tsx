export default function Layout({ children }: any) {
  return (
    <div className="container mx-auto">
      <header className="my-8 w-full text-center">RatingsMania</header>
      <main>{children}</main>
    </div>
  );
}
