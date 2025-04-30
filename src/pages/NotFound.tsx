
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/layout/AppSidebar";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-dashboard-dark">
      <AppSidebar />
      
      <main className="p-4 sm:p-6 md:p-8 ml-0 md:ml-64 flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Página não encontrada</p>
        <Link to="/" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors">
          Voltar para o Dashboard
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
