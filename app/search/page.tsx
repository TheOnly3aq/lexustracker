"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchIcon, Database, Eye } from "lucide-react";
import CarDetailModal from "@/components/car-detail-modal";

interface CarData {
  kenteken: string;
  voertuigsoort: string;
  merk: string;
  handelsbenaming: string;
  eerste_kleur: string;
  tweede_kleur?: string;
  wam_verzekerd: string;
  datum_eerste_tenaamstelling_in_nederland: string;
  datum_eerste_toelating: string;
  aantal_zitplaatsen?: string;
  aantal_cilinders?: string;
  cilinderinhoud?: string;
  massa_ledig_voertuig?: string;
  toegestane_maximum_massa_voertuig?: string;
  vervaldatum_apk?: string;
  brandstof_omschrijving?: string;
  carrosserie?: string;
  co2_uitstoot_gecombineerd?: string;
  wltp_co2_uitstoot_gecombineerd?: string;
  gem_brandstofverbruik_gecombineerd?: string;
  aantal_deuren?: string;
  emissiecode_omschrijving?: string;
  [key: string]: any; // Allow for additional fields from API
}

export default function Search() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoize filtered cars to prevent unnecessary re-renders
  const filteredCars = useMemo(() => {
    if (!searchTerm) return cars;

    return cars.filter((car) =>
      Object.values(car).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, cars]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}stats/rdw-data`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const allCars = data.data || data || [];
        setCars(allCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleCarClick = (car: CarData) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <div className="space-y-8">
      <div className="ml-12 lg:ml-0">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <SearchIcon className="w-8 h-8 text-red-500" />
          Search Cars
        </h1>
        <p className="text-gray-400 text-lg">
          Search through all registered Lexus vehicles • Click on any car for
          detailed information
        </p>
      </div>

      <Card className="card-gradient hover-lift prevent-shift">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg border border-red-500/30">
              <Database className="w-5 h-5 text-red-400" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-white text-lg sm:text-xl">
                Car Database
              </CardTitle>
              <p className="text-gray-400 text-xs sm:text-sm">
                Real-time vehicle registration search • Click any row to view
                details
              </p>
            </div>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by license plate, brand, color..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-effect border-white/10 text-white placeholder-gray-400 focus:border-red-500/50 transition-all text-sm sm:text-base"
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-red-500/30"></div>
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-red-500 border-t-transparent absolute top-0"></div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <Table className="table-responsive">
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-gray-300 font-semibold text-xs sm:text-sm px-3 sm:px-4">
                          License
                        </TableHead>
                        <TableHead className="text-gray-300 font-semibold text-xs sm:text-sm px-3 sm:px-4 sm:table-cell">
                          Model
                        </TableHead>
                        <TableHead className="text-gray-300 font-semibold text-xs sm:text-sm px-3 sm:px-4 hidden md:table-cell">
                          Color
                        </TableHead>
                        <TableHead className="text-gray-300 font-semibold text-xs sm:text-sm px-3 sm:px-4">
                          Insured?
                        </TableHead>
                        <TableHead className="text-gray-300 font-semibold text-xs sm:text-sm px-3 sm:px-4 hidden lg:table-cell">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCars.slice(0, 100).map((car, index) => (
                        <TableRow
                          key={`${car.kenteken}-${index}`}
                          className="border-white/10 hover:bg-white/5 transition-all duration-200 table-row-enter prevent-shift cursor-pointer group"
                          style={{
                            animationDelay: `${Math.min(index * 20, 1000)}ms`,
                            transform: "translate3d(0, 0, 0)",
                          }}
                          onClick={() => handleCarClick(car)}
                        >
                          <TableCell className="text-white font-mono font-semibold group-hover:text-red-400 transition-colors text-xs sm:text-sm px-3 sm:px-4">
                            {car.kenteken}
                          </TableCell>
                          <TableCell className="text-gray-300 group-hover:text-white transition-colors text-xs sm:text-sm px-3 sm:px-4 sm:table-cell">
                            {car.handelsbenaming}
                          </TableCell>
                          <TableCell className="text-gray-300 group-hover:text-white transition-colors text-xs sm:text-sm px-3 sm:px-4 hidden md:table-cell">
                            {car.eerste_kleur}
                          </TableCell>
                          <TableCell className="text-gray-300 px-2 sm:px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                                car.wam_verzekerd === "Ja"
                                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                  : "bg-red-500/20 text-red-400 border border-red-500/30"
                              }`}
                            >
                              {car.wam_verzekerd === "Ja" ? "✓" : "✗"}
                            </span>
                          </TableCell>
                          <TableCell className="text-gray-300 group-hover:text-white transition-colors text-xs px-2 sm:px-4 hidden lg:table-cell">
                            {car.datum_eerste_tenaamstelling_in_nederland}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <CarDetailModal
        car={selectedCar}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
