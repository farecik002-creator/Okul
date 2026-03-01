import { cn } from "@/lib/utils";
import { Heart, Sword } from "lucide-react";

interface PlayerInfoProps {
  level: number;
  hp: number;
  maxHp: number;
  exp: number;
  maxExp: number;
  shield: number;
  skillCharge: number;
  healCharge: number;
  onHeal: () => void;
  onBash: () => void;
  isHealGlow: boolean;
  isDamageGlow: boolean;
  isExpGlow: boolean;
  isShieldGlow: boolean;
}

export default function PlayerInfo({ 
  level, hp, maxHp, exp, maxExp, shield, skillCharge, healCharge, onHeal, onBash,
  isHealGlow, isDamageGlow, isExpGlow, isShieldGlow
}: PlayerInfoProps) {
  const hpPercentage = Math.max(0, Math.min(100, (hp / maxHp) * 100));
  const shieldPercentage = Math.max(0, Math.min(100, (shield / 50) * 100)); // Assuming 50 is max shield for display
  const expPercentage = Math.max(0, Math.min(100, (exp / maxExp) * 100));
  
  return (
    <div className="w-full flex flex-col gap-3 z-10">
      <div className="text-lg text-white font-display flex items-center drop-shadow-md">
        Player Lv. <span className="ml-1 text-xl font-bold">{level}</span>
      </div>
      
      {/* Shield Bar */}
      <div id="shield-bar" className="w-full h-5 progress-bar-bg p-[1px] relative flex items-center justify-center overflow-hidden rounded-lg border border-purple-500/30 shield-impact-target">
        <div 
          className={cn(
            "absolute left-0 top-0 bottom-0 bg-gradient-to-r from-purple-900 via-purple-600 to-purple-400 transition-all duration-300 ease-out",
            isShieldGlow && "animate-shimmer"
          )}
          style={{ width: `${shieldPercentage}%` }}
        >
          <div className="absolute inset-0 animate-sweep bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
        <span className="relative z-10 text-[10px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] uppercase tracking-wider">
          SHIELD {Math.ceil(shield)} / 50
        </span>
      </div>

      {/* HP Bar */}
      <div className="w-full h-7 progress-bar-bg p-[2px] relative flex items-center justify-center overflow-hidden rounded-xl border border-white/10 hp-impact-target">
        <div className="absolute inset-0 p-[2px]">
          <div 
            className={cn(
              "h-full rounded-lg transition-all duration-500 ease-out relative overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-600 to-emerald-400",
              isHealGlow && "flash-green",
              isDamageGlow && "flash-red"
            )}
            style={{ width: `${hpPercentage}%` }}
          >
             <div className="absolute inset-0 animate-sweep bg-gradient-to-r from-transparent via-white/20 to-transparent" />
             <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </div>
        <span className="relative z-10 text-xs font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] tracking-widest">
          {Math.ceil(hp)} / {maxHp}
        </span>
      </div>

      {/* EXP Bar */}
      <div className="w-full h-6 progress-bar-bg p-[1px] relative flex items-center justify-center overflow-hidden rounded-lg border border-amber-500/20">
        <div 
          className={cn(
            "absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber-900 via-amber-500 to-amber-300 transition-all duration-500 ease-out",
            isExpGlow && "animate-pulse-glow"
          )}
          style={{ width: `${expPercentage}%` }}
        >
          <div className="absolute inset-0 animate-sweep bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        </div>
        <span className="relative z-10 text-[10px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] uppercase tracking-widest">
          EXP {exp} / {maxExp}
        </span>
      </div>

      {/* Skills */}
      <div className="flex gap-3 mt-1">
        <SkillButton 
          id="heal-bar"
          name="HEAL" 
          icon={<Heart size={16} className="text-yellow-200 fill-yellow-200" />} 
          color="from-yellow-700 via-yellow-500 to-yellow-300" 
          glowColor="shadow-[0_0_20px_rgba(234,179,8,0.4)] border-yellow-400/50"
          charge={healCharge}
          onClick={onHeal}
        />
        <SkillButton 
          id="skill-bar"
          name="SKILL" 
          icon={<Sword size={16} className="text-sky-200 fill-sky-200" />} 
          color="from-sky-700 via-sky-500 to-sky-300" 
          glowColor="shadow-[0_0_20px_rgba(56,189,248,0.4)] border-sky-400/50"
          charge={skillCharge}
          onClick={onBash}
        />
      </div>
    </div>
  );
}

interface SkillButtonProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  charge: number;
  onClick: () => void;
}

function SkillButton({ id, name, icon, color, glowColor, charge, onClick }: SkillButtonProps) {
  const isReady = charge >= 100;
  
  return (
    <button 
      id={id}
      onClick={() => isReady && onClick()}
      disabled={!isReady}
      className={cn(
        "relative flex-1 rounded-xl border-2 overflow-hidden py-2.5 px-3 flex flex-col items-center justify-center transition-all duration-200",
        isReady 
          ? cn("active:scale-[0.97] hover:scale-[1.05] cursor-pointer bg-black/40", glowColor) 
          : "border-gray-700 opacity-60 cursor-not-allowed bg-gray-900/80"
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-b opacity-10", color)} />
      
      {/* Charge Fill at bottom */}
      <div 
        className={cn("absolute left-0 bottom-0 h-1.5 transition-all duration-300 bg-gradient-to-r", color)}
        style={{ width: `${charge}%` }}
      />
      
      <div className="flex items-center gap-2 z-10 w-full justify-center">
        {icon}
        <span className="text-white font-display font-black text-xs tracking-tighter uppercase">{name}</span>
      </div>
      <div className="text-white font-black text-[10px] z-10 mt-0.5 opacity-90">
        {charge}%
      </div>
    </button>
  );
}
