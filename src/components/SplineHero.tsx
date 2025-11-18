import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { NeonButton } from "./NeonButton";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
 
export function SplineHero() {
  return (
    <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden border-white/10">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-8 lg:p-12 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6">
            Gamificação 3D
            <br />
            <span className="gradient-text">Interativa</span>
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg text-lg mb-8">
            Transforme o desempenho da sua equipe com experiências imersivas e gamificação profissional. 
            Conquistas, níveis e progressão em 3D.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/signup">
              <NeonButton variant="neon" className="text-lg px-8 py-4">
                Começar Grátis
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </NeonButton>
            </Link>
            <Link to="/about">
              <NeonButton variant="glass" className="text-lg px-8 py-4">
                Explorar Plataforma
              </NeonButton>
            </Link>
          </div>
        </div>

        {/* Right content - 3D Scene */}
        <div className="flex-1 relative min-h-[300px] lg:min-h-0">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}
