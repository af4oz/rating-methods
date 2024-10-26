export default function Layout({ children }: any) {
  return (
    <div className="container mx-auto">
      <main>{children}</main>
    </div>
  );
}
