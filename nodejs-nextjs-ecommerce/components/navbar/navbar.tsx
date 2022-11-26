export default function Navbar () {
  return (
      <nav className="bg-white dark:bg-gray-600 flex w-full flex-1 flex-row items-center justify-center h-12 text-center justify-between sm:px-4">
          <h1 className="text-3xl font-bold whitespace-nowrap dark:text-white">Place</h1>
          <ul className="flex flex-row sm:px-4 dark:text-white">
              <li>
                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Meus pedidos</a>
              </li>
          </ul>
      </nav>
  )
}
