import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Custom404() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Page Not Found - 404</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or the URL might be incorrect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="px-6 py-3 bg-handshake-blue text-white rounded-lg font-semibold hover:bg-handshake-blue-dark transition-colors duration-200"
            >
              Go to Homepage
            </Link>
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
            >
              Go Back
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If you believe this is an error, please{' '}
              <a
                href="mailto:support@example.com"
                className="text-handshake-blue hover:underline"
              >
                contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
