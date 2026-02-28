import { GemType } from "@/hooks/useMatch3";
import { cn } from "@/lib/utils";

interface BoardProps {
  board: { id: string; type: GemType }[][];
  selected: { r: number; c: number } | null;
  onSelect: (r: number, c: number) => void;
  isProcessing: boolean;
}

export default function Board({
  board,
  selected,
  onSelect,
  isProcessing,
}: BoardProps) {

  const gemImageMap: Record<string, string> = {
    blue: "/gems/blue.png",
    red: "/gems/red.png",
    green: "/gems/green.png",
    purp: "/gems/purp.png",
    purple: "/gems/purp.png",
    yell: "/gems/yell.png",
    yellow: "/gems/yell.png",
    cya: "/gems/cya.png",
    cyan: "/gems/cya.png",
  };

  return (
    <div className="relative w-full aspect-square fantasy-border p-2 z-10 flex items-center justify-center board">
      <div
        className="w-full h-full grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${board.length}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${board.length}, minmax(0, 1fr))`,
        }}
      >
        {board.map((row, r) =>
          row.map((gem, c) => {
            const isSelected = selected?.r === r && selected?.c === c;
            const isEmpty = gem.type === "empty";

            const gemImage = gemImageMap[gem.type];

            return (
              <div
                key={gem.id}
                data-pos={`${r},${c}`}
                data-testid={`gem-${r}-${c}`}
                onClick={() => !isEmpty && onSelect(r, c)}
                className={cn(
                  "relative w-full h-full flex items-center justify-center transition-all duration-300 tile",
                  isSelected && "scale-110 z-10",
                  !isEmpty && !isProcessing && "cursor-pointer hover:scale-105",
                  isEmpty ? "opacity-0 scale-50" : "opacity-100 scale-100"
                )}
              >
                {!isEmpty && gemImage && (
                  <img
                    src={gemImage}
                    alt={gem.type}
                    className={cn(
                      "w-full h-full object-contain transition-all duration-300",
                      isSelected &&
                        "ring-2 ring-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    )}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}