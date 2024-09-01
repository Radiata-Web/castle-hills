import PackageItem from "./misc/packageItem";

export default function Packages() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {PACKAGES.map((pkg) => (
        <PackageItem key={pkg.name} {...pkg} />
      ))}
    </div>
  );
}

const PACKAGES = [
  {
    name: "Basic Wash",
    price: {
      single: 10,
      monthly: 0,
    },
    features: ["Presoak", "Spot Free Rinse", "Blowers"],
    purchaseUrl: "#",
  },
  {
    name: "Wheel & Wax BLAST",
    price: {
      single: 15,
      monthly: 25,
    },
    features: [
      "Bug Prep",
      "Wheel Cleaner",
      "Triple Foam",
      "Hot Wax",
      "Spot Free Rinse",
      "Blowers",
    ],
    purchaseUrl: "www.google.com",
  },
  {
    name: "Ceramic BLAST",
    price: {
      single: 20,
      monthly: 35,
    },
    features: [
      "Bug Prep",
      "Presoak",
      "Wheel Cleaner",
      "Triple Foam",
      "Wheel Cleaner 2",
      "Hot Wax",
      "Ceramic Coating",
      "Spot Free Rinse",
      "Blowers",
      "Tire Shine",
    ],
    purchaseUrl: "#",
  },
  {
    name: "Graphene BLAST",
    price: {
      single: 25,
      monthly: 45,
    },
    features: [
      "Bug Prep",
      "Presoak",
      "Wheel Cleaner",
      "Triple Foam",
      "Wheel Cleaner 2",
      "Hot Wax",
      "Ceramic Coating",
      "Graphine protection",
      "Spot Free Rinse",
      "Blowers",
      "Tire Shine",
      "Towel Dry",
    ],
    purchaseUrl: "#",
  },
];
