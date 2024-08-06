import ManagementLayout from "@/components/layout/ManagementLayout";

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return <ManagementLayout params={{ locale }}>{children}</ManagementLayout>;
}
