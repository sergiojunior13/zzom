import { Spinner } from "@/components/spinner";

export default function Loading() {
    return <main className="flex flex-col gap-3 justify-center items-center min-h-96">
        <Spinner />
        <p>Carregando...</p>
    </main>
}