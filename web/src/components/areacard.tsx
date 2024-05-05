import { Card } from "./card"

export function AreaCard (){
    <div className="p-6 bg-transparent">
          <h2 className="font-semibold text-3xl nt-10"> Álbuns Populares </h2>
          <div className="flex gap-5 justify-starter">
           <Card />
           <Card />
           <Card />
           <Card />
           <Card />
           </div>
    </div>
}