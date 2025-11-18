import { SplineScene } from "@/components/ui/splite";
import logoRobot from "@/assets/logo-robot.png";
 
export function SplineHero() {
  return (
    <div className="w-full h-[600px] relative overflow-hidden rounded-2xl">
      <SplineScene 
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
      />
      {/* Logo overlay on robot's chest */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <img 
          src={logoRobot} 
          alt="Logo" 
          className="w-12 h-12 md:w-16 md:h-16 rounded-md bg-white/95 p-1.5 shadow-md opacity-90"
        />
      </div>
    </div>
  );
}
