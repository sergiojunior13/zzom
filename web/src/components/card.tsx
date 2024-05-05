


export function Card() {
    return (
        <a className="flex flex-col mt-1 justify-center h-64 w-mvw gap-3 rounded-lg hover:bg-zinc-800 items-center p-3  ">
           <img src="/nf.jpeg" alt = "foto do album" className="rounded-lg h-quadrado w-quadrado"/>
            <div className="flex items-start w-full flex-col font-semibold">
                music   
                <p className="text-zinc-300 text-sm">nome-cantor</p>
            </div>
        </a>
    );
}