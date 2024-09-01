import { Check } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface PackageProps {
  name: string;
  features: string[];
  price: { single: number; monthly: number };
  purchaseUrl: string;
}

export default function PackageItem(props: PackageProps) {
  return (
    <div className="border border-zinc-200 p-6 flex flex-col justify-between rounded-lg">
      {/* Package */}
      <div>
        <h3 className="text-xl font-bold">{props.name}</h3>
        <hr className="my-5" />

        {/* Feature list */}
        <ul className="ml-3">
          {props.features.map((feature) => (
            <li
              key={`${feature + Math.random() * 4}`}
              className="flex items-center"
            >
              <Check
                size={20}
                strokeWidth={3}
                className="inline mr-1.5"
                style={{ color: "var(--accent)" }}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div>
        {/* Prices */}
        <span className="flex flex-row gap-5 justify-around py-8">
          {/* Shows a monthly price if there is one */}
          {props.price.monthly > 0 ? (
            <div className="flex flex-col items-center">
              <p className="text-4xl font-semibold">${props.price.monthly}</p>
              <p className="text-sm text-zinc-500">MONTHLY</p>
            </div>
          ) : null}
          <div className="flex flex-col items-center">
            <p className="text-4xl font-semibold">${props.price.single}</p>
            <p className="text-sm text-zinc-500">SINGLE</p>
          </div>
        </span>

        {/* CTA button */}
        <Button className="w-full" asChild>
          <Link href={props.purchaseUrl}>Sign up now</Link>
        </Button>
      </div>
    </div>
  );
}
