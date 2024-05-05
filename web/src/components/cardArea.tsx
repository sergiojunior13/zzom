import { Card } from "./card"


export function CardArea (){
    return (
        <div className="p-6 bg-transparent items-center ml-8" >
            <h2 className="font-semibold text-3xl nt-10 mb-8"> Álbuns Populares </h2>
            <div className="flex gap-5 mt-4 mb-4">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
          </div>
    )
}