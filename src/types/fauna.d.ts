/**
 * fauna.d.ts
 * TypeScript interface and schema definition for Earth Paleobiological & Fossil Fauna Catalog.
 */

export type EnvironmentType = 'terrestrial' | 'marine' | 'aerial' | 'amphibious';

export type GeologicalEra = 'cenozoico' | 'mesozoico' | 'paleozoico' | 'precambrico';

export interface Coordinates {
  /** Latitude in decimal degrees: -90.0 to +90.0 */
  lat: number;
  /** Longitude in decimal degrees: -180.0 to +180.0 */
  lng: number;
}

export interface PaleoCoordinates {
  /** Paleolatitude in decimal degrees during fossil era: -90.0 to +90.0 */
  lat: number;
  /** Paleolongitude in decimal degrees: -180.0 to +180.0 */
  lon: number;
}

export interface SpeciesMetrics {
  /** Total body length or wingspan in meters (e.g. 12.4) */
  lengthMeters: number;
  /** Estimated body mass in metric tons (e.g. 8.4) */
  weightTons: number;
  /** Standing height at shoulders or crest in meters (optional) */
  heightMeters?: number;
}

export interface SpeciesMedia {
  /** Relative web URL path to local illustration asset (e.g. "assets/species/chilesaurus.jpg") */
  imageUrl: string;
  /** Primary illustrator, scientific institution or copyright holder */
  imageAuthor?: string;
  /** Usage license (e.g. "Creative Commons CC-BY" or "Dominio Público") */
  imageLicense?: string;
  /** Optional Phylopic vector SVG silhouette URL */
  phylopicSvgUrl?: string;
}

export interface SpeciesDiscovery {
  /** Naturalist, paleontologist, or expedition team who found the initial fossil */
  discoverer: string;
  /** Calendar year when the specimen was first excavated or discovered */
  yearDiscovered?: number;
  /** Academic author(s) and original peer-reviewed publication citation */
  describedBy: string;
  /** Geological rock formation or layer (e.g. "Formación Toqui", "Burgess Shale") */
  geologicalFormation: string;
  /** Institutional catalog identifier of holotype specimen (e.g. "SGO-PV 1930") */
  typeSpecimen?: string;
  /** Museum or research repository where the holotype resides */
  museum?: string;
  /** Modern country where the fossil deposits are situated (e.g. "Chile 🇨🇱") */
  modernCountry: string;
  /** Direct holotype specimen accession number */
  holotypeSpecimen?: string;
}

export interface SpeciesPaleogeography {
  /** Ocean, epeiric sea, or basin adjacent to the fossil locality */
  waterBody?: string;
  /** Ancestral landmass, craton or continent (e.g. "Gondwana", "Laurasia") */
  landmass?: string;
  /** Depth range, elevation or ecological paleo-biome */
  depthOrBiome?: string;
  /** Contextual paleoenvironmental description */
  paleoZoneDescription?: string;
}

export interface FossilSpecies {
  /** Unique URL-friendly slug identifier (e.g. "chilesaurus-diegosuarezi") */
  id: string;
  /** Popular or vernacular name in Spanish (e.g. "Chilesaurio") */
  commonName: string;
  /** Binomial or genus nomenclature in Latin (e.g. "Chilesaurus diegosuarezi") */
  scientificName: string;
  /** Clade, taxonomic order or family grouping */
  clade: string;
  /** Associated geological timeline period ID (e.g. "jurassic_150ma", "present_0ma") */
  periodId: string;
  /** Geological age of earliest appearance in Mega-annum (Ma), e.g. 148 */
  startMa: number;
  /** Geological age of latest appearance or extinction in Ma, e.g. 145 (startMa >= endMa >= 0) */
  endMa: number;
  /** Trophic classification and dietary regime (e.g. "Carnívoro", "Herbívoro", "Piscívoro") */
  diet: string;
  /** Anatomical scale metrics (length, mass, height) */
  metrics: SpeciesMetrics;
  /** Geographical and stratigraphic location array */
  paleoLocation: string[];
  /** Detailed scientific synopsis and paleobiological description */
  description: string;
  /** Paleoart asset and licensing information */
  media: SpeciesMedia;
  /** Modern geographic excavation coordinates */
  coordinates: Coordinates;
  /** Ecosystem habit */
  environment: EnvironmentType;
  /** Historical discovery and holotype museum details */
  discovery: SpeciesDiscovery;
  /** Ancestral tectonic paleogeography and environment */
  paleogeography?: SpeciesPaleogeography;
  /** Rotated continental drift coordinates during the organism's era */
  paleoCoordinates?: PaleoCoordinates;

  // Chilean Paleontological Provenance (🇨🇱)
  /** Flag indicating whether the fossil was discovered in Chilean territory */
  isChilean?: boolean;
  /** Administrative region of Chile (e.g. "Región de Aysén", "Región de Magallanes") */
  chileanRegion?: string;
  /** Administrative province of Chile (e.g. "Provincia General Carrera", "Provincia de Última Esperanza") */
  chileanProvince?: string;
  /** Specific town, valley or fossil locality in Chile (e.g. "Mallín Grande, Lago General Carrera") */
  chileanLocality?: string;
}
