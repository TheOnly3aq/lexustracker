"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Calendar, Palette, Shield, MapPin, FileText } from "lucide-react";

interface CarData {
  kenteken: string;
  voertuigsoort: string;
  merk: string;
  handelsbenaming: string;
  eerste_kleur: string;
  tweede_kleur?: string;
  aantal_zitplaatsen?: string;
  aantal_staanplaatsen?: string;
  datum_eerste_toelating: string;
  datum_eerste_tenaamstelling_in_nederland: string;
  wam_verzekerd: string;
  aantal_cilinders?: string;
  cilinderinhoud?: string;
  massa_ledig_voertuig?: string;
  toegestane_maximum_massa_voertuig?: string;
  massa_rijklaar?: string;
  maximum_massa_trekken_ongeremd?: string;
  maximum_massa_trekken_geremd?: string;
  datum_afgifte_apskeuring?: string;
  datum_einde_apskeuring?: string;
  indicatie_snelheid?: string;
  laadvermogen?: string;
  oplegger_geremd?: string;
  aanhangwagen_autonoom_remmen?: string;
  aanhangwagen_middenas?: string;
  aantal_wielen?: string;
  aantal_assen?: string;
  handelsbenaming_uitgebreid?: string;
  vermogen_massaverhouding?: string;
  uitvoering?: string;
  variant?: string;
  uitvoering_volgnummer?: string;
  volgnummer_wijziging_eu_typegoedkeuring?: string;
  vermogen_brom_snorfiets?: string;
  datum_tenaamstelling?: string;
  vervaldatum_apk?: string;
  taxi_indicator?: string;
  maximum_massa_samenstelling?: string;
  aantal_deuren?: string;
  aantal_wielen_aangedreven?: string;
  carrosserie?: string;
  carrosserie_specifiek?: string;
  brandstof_omschrijving?: string;
  brandstof_volgnummer?: string;
  emissiecode_omschrijving?: string;
  emissiecode_volgnummer?: string;
  europese_voertuigcategorie?: string;
  europese_voertuigcategorie_toevoeging?: string;
  europese_uitvoeringcategorie_toevoeging?: string;
  plaats_chassisnummer?: string;
  technische_max_massa_voertuig?: string;
  type?: string;
  type_gasinstallatie_omschrijving?: string;
  typegoedkeuringsnummer?: string;
  variant_as_omschrijving?: string;
  wielbasis?: string;
  export_indicator?: string;
  openstaande_terugroepactie_indicator?: string;
  vervaldatum_tachograaf?: string;
  taxi_indicator_geldig_tot?: string;
  maximum_last_onder_de_vooras_sen?: string;
  maximum_last_onder_de_achteras_sen?: string;
  co2_uitstoot_gecombineerd?: string;
  co2_uitstoot_gewogen?: string;
  netto_maximum_vermogen?: string;
  massa_alt_aandrijving?: string;
  nettomaximumvermogen_hybride?: string;
  nedc_co2?: string;
  wltp_co2_uitstoot_gecombineerd?: string;
  wltp_co2_uitstoot_laag?: string;
  wltp_co2_uitstoot_middel?: string;
  wltp_co2_uitstoot_hoog?: string;
  wltp_co2_uitstoot_extra_hoog?: string;
  gem_lading_ah?: string;
  gem_lading_wh?: string;
  actieradius_wltp?: string;
  gem_energieverbruik_wltp_gecombineerd?: string;
  gem_energieverbruik_wltp_laag?: string;
  gem_energieverbruik_wltp_middel?: string;
  gem_energieverbruik_wltp_hoog?: string;
  gem_energieverbruik_wltp_extra_hoog?: string;
  gem_brandstofverbruik_wltp_gecombineerd?: string;
  gem_brandstofverbruik_wltp_laag?: string;
  gem_brandstofverbruik_wltp_middel?: string;
  gem_brandstofverbruik_wltp_hoog?: string;
  gem_brandstofverbruik_wltp_extra_hoog?: string;
  gem_brandstofverbruik_buiten_bebouwde_kom?: string;
  gem_brandstofverbruik_gecombineerd?: string;
  gem_brandstofverbruik_stad?: string;
  geluidsniveau_rijdend?: string;
  geluidsniveau_stationair?: string;
  geluidsniveau_stationair_toerental?: string;
  co_uitstoot?: string;
  hc_uitstoot?: string;
  nox_uitstoot?: string;
  hc_nox_uitstoot?: string;
  particulates_uitstoot?: string;
  massa_bedrijfsklaar?: string;
  wegbelasting_kwartaal_minimum?: string;
  wegbelasting_kwartaal_maximum?: string;
  wegbelasting_jaar_minimum?: string;
  wegbelasting_jaar_maximum?: string;
  catalogusprijs?: string;
  bpm?: string;
  g3_installatie_aanwezig?: string;
  aantal_rolstoelplaatsen?: string;
  maximum_ondersteunende_snelheid?: string;
  jaar_laatste_registratie_tellerstand?: string;
  tellerstandoordeel?: string;
  code_toelichting_tellerstandoordeel?: string;
  tenaamstelling_dt?: string;
  vervaldatum_apk_dt?: string;
  datum_eerste_toelating_dt?: string;
  datum_eerste_tenaamstelling_in_nederland_dt?: string;
  datum_afgifte_apskeuring_dt?: string;
  datum_einde_apskeuring_dt?: string;
  vervaldatum_tachograaf_dt?: string;
  maximum_last_onder_de_vooras_sen_tezamen_koppeling?: string;
  type_remsysteem_voertuig_code?: string;
  rupsonderstelconfiguratie?: string;
  wielbasis_voertuig_minimum?: string;
  wielbasis_voertuig_maximum?: string;
  lengte?: string;
  breedte?: string;
  hoogte_voertuig?: string;
  hoogte_voertuig_minimum?: string;
  hoogte_voertuig_maximum?: string;
  wielbasis_voertuig?: string;
  technische_max_massa_samenstelling?: string;
}

interface CarDetailModalProps {
  car: CarData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CarDetailModal({
  car,
  isOpen,
  onClose,
}: CarDetailModalProps) {
  if (!car) return null;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatValue = (value: any) => {
    if (value === null || value === undefined || value === "") return "N/A";
    return String(value);
  };

  const basicInfo = [
    { label: "License Plate", value: car.kenteken, icon: FileText },
    { label: "Brand", value: car.merk, icon: Car },
    { label: "Model", value: car.handelsbenaming, icon: Car },
    { label: "Vehicle Type", value: car.voertuigsoort, icon: Car },
    { label: "Primary Color", value: car.eerste_kleur, icon: Palette },
    { label: "Secondary Color", value: car.tweede_kleur, icon: Palette },
  ];

  const registrationInfo = [
    {
      label: "First Registration",
      value: formatDate(car.datum_eerste_toelating),
      icon: Calendar,
    },
    {
      label: "First Registration NL",
      value: formatDate(car.datum_eerste_tenaamstelling_in_nederland),
      icon: MapPin,
    },
    { label: "Insurance Status", value: car.wam_verzekerd, icon: Shield },
    {
      label: "APK Expiry",
      value: formatDate(car.vervaldatum_apk),
      icon: Calendar,
    },
  ];

  const technicalInfo = [
    { label: "Engine Cylinders", value: car.aantal_cilinders },
    {
      label: "Engine Displacement",
      value: car.cilinderinhoud ? `${car.cilinderinhoud} cc` : undefined,
    },
    {
      label: "Empty Weight",
      value: car.massa_ledig_voertuig
        ? `${car.massa_ledig_voertuig} kg`
        : undefined,
    },
    {
      label: "Max Weight",
      value: car.toegestane_maximum_massa_voertuig
        ? `${car.toegestane_maximum_massa_voertuig} kg`
        : undefined,
    },
    { label: "Seats", value: car.aantal_zitplaatsen },
    { label: "Doors", value: car.aantal_deuren },
    { label: "Fuel Type", value: car.brandstof_omschrijving },
    { label: "Body Type", value: car.carrosserie },
  ];

  const environmentalInfo = [
    {
      label: "CO2 Emissions",
      value: car.co2_uitstoot_gecombineerd
        ? `${car.co2_uitstoot_gecombineerd} g/km`
        : undefined,
    },
    {
      label: "WLTP CO2",
      value: car.wltp_co2_uitstoot_gecombineerd
        ? `${car.wltp_co2_uitstoot_gecombineerd} g/km`
        : undefined,
    },
    {
      label: "Fuel Consumption",
      value: car.gem_brandstofverbruik_gecombineerd
        ? `${car.gem_brandstofverbruik_gecombineerd} l/100km`
        : undefined,
    },
    {
      label: "Energy Consumption",
      value: car.gem_energieverbruik_wltp_gecombineerd
        ? `${car.gem_energieverbruik_wltp_gecombineerd} Wh/km`
        : undefined,
    },
    {
      label: "Electric Range",
      value: car.actieradius_wltp ? `${car.actieradius_wltp} km` : undefined,
    },
    { label: "Emission Code", value: car.emissiecode_omschrijving },
  ];

  const isImported =
    car.datum_eerste_tenaamstelling_in_nederland !== car.datum_eerste_toelating;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-effect border-white/10">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg border border-red-500/30">
                <Car className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <DialogTitle className="text-2xl text-white">
                  {car.merk} {car.handelsbenaming}
                </DialogTitle>
                <p className="text-gray-400 font-mono text-lg">
                  {car.kenteken}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isImported && (
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  Imported
                </Badge>
              )}
              <Badge
                className={`${
                  car.wam_verzekerd === "Ja"
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-red-500/20 text-red-400 border-red-500/30"
                }`}
              >
                {car.wam_verzekerd === "Ja" ? "Insured" : "Not Insured"}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Basic Information */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-400" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {basicInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0"
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{item.label}</span>
                  </div>
                  <span className="text-white font-medium">
                    {formatValue(item.value)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Registration Information */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-400" />
                Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {registrationInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0"
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{item.label}</span>
                  </div>
                  <span className="text-white font-medium">
                    {formatValue(item.value)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Technical Specifications */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                Technical Specs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {technicalInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0"
                >
                  <span className="text-gray-300 text-sm">{item.label}</span>
                  <span className="text-white font-medium">
                    {formatValue(item.value)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Environmental Information */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Environmental
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {environmentalInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0"
                >
                  <span className="text-gray-300 text-sm">{item.label}</span>
                  <span className="text-white font-medium">
                    {formatValue(item.value)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
