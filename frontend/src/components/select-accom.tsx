import { Button } from "@/components/ui/button";
import { parks_array } from "@/helpers/contants";

export function SelectAccom() {
  return (
    <div className="max-w-lg mx-auto">
      {parks_array.map((park) => (
        <div key={park.id} className="flex gap-2">
          <Button variant={"link"}>{park.name}</Button>
        </div>
      ))}
    </div>
  );
}
