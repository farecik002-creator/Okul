import { cn } from "@/lib/utils";

interface EnemyInfoProps {
  name?: string;
  level: number;
  hp: number;
  maxHp: number;
}

export default function EnemyInfo({ name = "VOID WEAVER", level, hp, maxHp }: EnemyInfoProps) {
  const hpPercentage = Math.max(0, Math.min(100, (hp / maxHp) * 100));

  return (
    <div id="hp-bar" className="w-full flex flex-col gap-2 z-10">
      <div className="flex flex-col">
        <div className="text-xl text-white font-display flex items-center drop-shadow-md uppercase">
          {name} <span className="ml-2 text-sm opacity-80">Lv. {level}</span>
        </div>
        <div className="text-xs font-bold text-red-400 drop-shadow-sm font-mono tracking-wider">
          HP: {Math.ceil(hp)}/{maxHp}
        </div>
      </div>
      
      <div className="w-full h-6 progress-bar-bg p-[2px] relative flex items-center justify-center overflow-hidden hp-impact-target">
        <div className="absolute inset-0 p-[2px]">
          <div 
            className="progress-bar-fill bg-[var(--color-hp-red)] rounded-full h-full"
            style={{ width: `${hpPercentage}%` }}
          />
        </div>
        <span className="relative z-10 text-[10px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] uppercase">
          {Math.ceil(hp)} / {maxHp}
        </span>
      </div>
    </div>
  );
}
