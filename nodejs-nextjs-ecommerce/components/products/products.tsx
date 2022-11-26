import Image from "next/image";

interface ProductProps {
    name: string;
    price: string;
}

const IMAGE_MOCK = "/assets/photo-1518780664697-55e3ad937233.jpg"

export default function Product ({ name, price }: ProductProps ) {
    return (
        <section className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{name}</div>
                    <a
                    href="#"
                    className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
                    <p className="mt-2 text-slate-500">{price}</p>
                    <Image
                        className="h-48 w-full object-cover md:h-full md:w-48"
                        src={IMAGE_MOCK}
                        width="100" height="100"
                        alt="Man looking at item at a store"
                    />
                </div>
            </div>
        </section>
    )
}

