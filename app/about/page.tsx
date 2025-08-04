import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Code, Database, Smartphone, Zap, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="space-y-8">
      <div className="ml-12 lg:ml-0">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <Info className="w-8 h-8 text-red-500" />
          About This Dashboard
        </h1>
        <p className="text-gray-400 text-lg">
          Learn about how this application was built
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="card-gradient hover-lift ">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30">
                <Code className="w-5 h-5 text-blue-400" />
              </div>
              <CardTitle className="text-white text-xl">
                Technology Stack
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                Frontend
              </h4>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Next.js 14 with App Router
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  React 18 with Server Components
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Tailwind CSS for styling
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Recharts for data visualization
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                Features
              </h4>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Server-side rendering (SSR)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Responsive design
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Dark mode with red accents to match the IS250C
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Interactive charts and tables
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card
          className="card-gradient hover-lift"
          style={{ animationDelay: "100ms" }}
        >
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg border border-red-500/30">
                <Database className="w-5 h-5 text-red-400" />
              </div>
              <CardTitle className="text-white text-xl">Data Sources</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-white font-semibold mb-3">API Endpoints</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Daily/Monthly count statistics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  RDW vehicle registration data
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Daily differences tracking
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Real-time data updates
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Data Processing</h4>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                  Color-based filtering
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                  Insurance status tracking
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                  Import/export analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                  Search functionality
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card
          className="card-gradient hover-lift lg:col-span-2"
          style={{ animationDelay: "200ms" }}
        >
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30">
                <Smartphone className="w-5 h-5 text-purple-400" />
              </div>
              <CardTitle className="text-white text-xl">
                Purpose & Design
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-3">
                  Why This Dashboard?
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This Lexus tracker was created to provide insights into the
                  Lexus IS250C. The goal is to give users an overview of the key
                  statistics and trends for these Lexus vehicles, with a focus
                  on registration data and insurance status.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">
                  Design Philosophy
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The interface features a modern dark theme with subtle
                  gradients and smooth animations inspired by react-bits.dev.
                  The responsive design ensures optimal viewing across all
                  devices, while intuitive navigation enhances the user
                  experience without overwhelming the data presentation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
