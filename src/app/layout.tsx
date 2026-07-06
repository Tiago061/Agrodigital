import type { Metadata } from "next";
import "./globals.css";
import { AgroProvider } from "@/context/AgroContext";

export const metadata: Metadata = {
  title: "Agrodigital | Tecnologia no Campo, Conexão com o Produtor",
  description: "A melhor plataforma para produtores rurais, fazendas e amantes de pets. Encontre rações, medicamentos, fertilizantes, ferramentas e contrate serviços especializados.",
  keywords: ["agropecuária", "ração", "medicamentos veterinários", "fertilizantes", "ferramentas", "agronegócio", "pet shop", "consultoria rural"],
  authors: [{ name: "Agrodigital" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AgroProvider>
          {children}
        </AgroProvider>
      </body>
    </html>
  );
}
