import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <Link href="/api" className="text-blue-500 hover:underline">
            API Documentation
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/api/list" className="text-blue-500 hover:underline">
            List Endpoint
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/api/rand" className="text-blue-500 hover:underline">
            Random Endpoint
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/api/info?file_code=example_code" className="text-blue-500 hover:underline">
            Info Endpoint (example)
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/api/search?q=example" className="text-blue-500 hover:underline">
            Search Endpoint (example)
          </Link>
        </li>
      </ul>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Cache Information</h2>
        <p className="mb-4">API responses are cached to improve performance. Cache durations:</p>
        <ul className="list-disc pl-5">
          <li>
            Info API: <strong>5 years</strong>
          </li>
          <li>
            Search API: <strong>1 year</strong>
          </li>
        </ul>
        <p className="mt-4">To clear the cache, send a POST request to /api/cache with the following JSON body:</p>
        <pre className="bg-gray-200 p-2 rounded mt-2 overflow-x-auto">
          {`// Clear all cache
{
  "action": "clear_all"
}

// Clear specific cache entry
{
  "action": "clear_entry",
  "key": "/api/info?file_code=example_code"
}`}
        </pre>
      </div>
    </div>
  )
}

