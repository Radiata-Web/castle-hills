import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
} from "@/components/ui/map";

// Castle Hills, Lewisville TX — zoomed out enough to read as the DFW service area.
const CENTER: [number, number] = [-96.9497, 33.0465];

export default function ServiceMap() {
  return (
    <Map center={CENTER} zoom={8.5} theme="light" scrollZoom={false}>
      <MapMarker longitude={CENTER[0]} latitude={CENTER[1]}>
        <MarkerContent />
        <MarkerTooltip>Castle Hills Stain &amp; Restoration</MarkerTooltip>
      </MapMarker>
    </Map>
  );
}
