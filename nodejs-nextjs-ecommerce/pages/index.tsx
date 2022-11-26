import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/navbar/navbar'
import {Product} from "../components/products";

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3333/api/v1/products`);
    const products = await res.json()

    // Pass data to the page via props
    return { props: { products } }
}


const Home: NextPage = ({ products = [] }: any) => {
  return (
    <div>
      <Head>
        <title>Web place</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main className="bg-gray-500 flex w-full flex-col ">
          <p>Últimos produtos adicionados</p>
          <ul className="items-center justify-center">
              {products.map((product: any) => (
                  <Product key={product.id} name={product.name} price={product.price}/>
              ))}
          </ul>
      </main>
      <footer className="flex h-20 w-full items-center justify-center">
          <p>Copyright</p>
      </footer>
    </div>
  )
}

export default Home;


