import Link from "next/link";

export function FilterByClient({ clients, client, currentPage }) {
  return (
    <>
      {/* Selector de cliente con enlaces */}
      <div className="mt-2 flex items-center gap-2">
        <span>Filter by Client:</span>
        <div className="flex gap-2">
          <Link
            href={{
              pathname: "/dashboard/budgets",
              query: {
                page: currentPage || 1, // Mantener la página actual
              },
            }}
          >
            <button className="border p-1 rounded-lg hover:bg-gray-700 hover:text-white dark:hover:bg-gray-500">
              All clients
            </button>
          </Link>
          {clients
            .filter((clientMapped) => clientMapped != null)
            .map((clientMapped) => (
              <Link
                key={clientMapped}
                href={{
                  pathname: "/dashboard/budgets",
                  query: {
                    client: clientMapped, // Mantener el cliente
                    page: currentPage || 1, // Mantener la página actual
                  },
                }}
              >
                <button
                  className={`border p-1 rounded-lg hover:bg-gray-700 hover:text-white dark:hover:bg-gray-500 ${
                    client === clientMapped
                      ? "bg-gray-700 text-white dark:bg-gray-500"
                      : ""
                  }`}
                >
                  {clientMapped}
                </button>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
