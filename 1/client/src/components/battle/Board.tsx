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

  /* IŞIK GİBİ SÜZÜLEN ENERJİ */
  const spawnStream = (r: number, c: number, type: string) => {
    const tile = document.querySelector(
      `[data-pos="${r},${c}"]`
    ) as HTMLElement;

    if (!tile) return;

    // CYAN sadece patlama
    if (type === "cyan" || type === "cya") {
      tile.classList.add("cyan-burst");
      setTimeout(() => tile.classList.remove("cyan-burst"), 400);
      return;
    }

    const orb = document.createElement("div");
    orb.className = `energy-stream ${type}`;
    document.body.appendChild(orb);

    const rect = tile.getBoundingClientRect();

    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    orb.style.left = `${startX}px`;
    orb.style.top = `${startY}px`;

    // Hafif sağa sola kıvrımlı süzülme
    const offsetX = (Math.random() - 0.5) * 150;
    const offsetY = -280 - Math.random() * 120;

    requestAnimationFrame(() => {
      orb.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0.3)`;
      orb.style.opacity = "0";
    });

    setTimeout(() => {
      orb.remove();
    }, 900);
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
                onClick={() => {
                  if (!isEmpty) {
                    spawnStream(r, c, gem.type);
                    onSelect(r, c);
                  }
                }}
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