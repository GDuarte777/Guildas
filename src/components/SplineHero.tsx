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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <img 
          src={logoRobot} 
          alt="Logo" 
          className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-white p-2 shadow-lg"
        />
      </div>
    </div>
  );
}
