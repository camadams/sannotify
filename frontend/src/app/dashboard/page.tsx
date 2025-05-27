"use client";
import { DropdownMenuDemo } from "@/components/dropdown";
import { SelectAccom } from "@/components/select-accom";
import { Button } from "@/components/ui/button";
import { parks_array } from "@/helpers/contants";
import { useState } from "react";
export default function Home() {
  const [selection, setSelection] = useState({
    park: 0,
    camp: 0,
    accom: 0,
  });

  return (
    <div className="max-w-lg mx-auto">
      {JSON.stringify(selection)}
      {selection.park === 0 ? (
        parks_array.map((park) => (
          <div key={park.id} className="flex gap-2">
            <Button
              variant={"link"}
              onClick={() => setSelection({ park: park.id, camp: 0, accom: 0 })}
            >
              {park.name}
            </Button>
          </div>
        ))
      ) : selection.camp === 0 ? (
        parks_array
          .find((park) => park.id === selection.park)
          ?.camp.map((camp) => (
            <div key={camp.id} className="flex gap-2">
              <Button
                variant={"link"}
                onClick={() =>
                  setSelection({
                    park: selection.park,
                    camp: camp.id,
                    accom: 0,
                  })
                }
              >
                {camp.name}
              </Button>
            </div>
          ))
      ) : selection.accom === 0 ? (
        parks_array
          .find((park) => park.id === selection.park)
          ?.camp.find((camp) => camp.id === selection.camp)
          ?.accom?.map((accom) => (
            <div key={accom.id} className="flex gap-2">
              <Button
                variant={"link"}
                onClick={() =>
                  setSelection({
                    park: selection.park,
                    camp: selection.camp,
                    accom: accom.id,
                  })
                }
              >
                {accom.name}
              </Button>
            </div>
          ))
      ) : (
        <div>
          <h1>
            {
              parks_array
                .find((park) => park.id === selection.park)
                ?.camp.find((camp) => camp.id === selection.camp)
                ?.accom?.find((accom) => accom.id === selection.accom)?.name
            }
          </h1>
        </div>
      )}
    </div>
  );
}
