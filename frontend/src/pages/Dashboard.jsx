// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import ReactMarkdown from "react-markdown"

// import {
//   createReview,
//   getReviews
// } from "../api"


// function Dashboard() {

//   const navigate = useNavigate()

//   const token = localStorage.getItem("token")


//   const [language, setLanguage] = useState("python")

//   const [code, setCode] = useState(
// `def add(a, b):
//     return a - b`
//   )

//   const [review, setReview] = useState("")
//   const [reviews, setReviews] = useState([])

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")


//   useEffect(() => {

//     const loadReviews = async () => {

//       try {

//         const data = await getReviews(token)

//         setReviews(data)

//       } catch (error) {

//         console.error(error)

//       }
//     }

//     loadReviews()

//   }, [token])


//   const handleReview = async () => {

//     if (!code.trim()) {
//       setError("Please enter some code.")
//       return
//     }

//     setError("")
//     setReview("")
//     setLoading(true)

//     try {

//       const data = await createReview(
//         language,
//         code,
//         token
//       )

//       setReview(data.review)

//       setReviews((previousReviews) => [
//         data,
//         ...previousReviews
//       ])

//     } catch (error) {

//       if (error.response?.data?.detail) {
//         setError(error.response.data.detail)
//       } else {
//         setError("Failed to review code.")
//       }

//     } finally {

//       setLoading(false)

//     }
//   }


//   const handleLogout = () => {

//     localStorage.removeItem("token")

//     navigate("/login")

//   }


//   return (
//     <div className="min-h-screen bg-slate-100">

//       <header className="border-b bg-slate-950 text-white">

//         <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

//           <div>

//             <h1 className="text-xl font-bold">
//               AI Code Review
//             </h1>

//             <p className="text-sm text-slate-400">
//               Analyze your code with AI
//             </p>

//           </div>


//           <button
//             onClick={handleLogout}
//             className="rounded-lg border border-slate-600 px-4 py-2 text-sm hover:bg-slate-800"
//           >
//             Logout
//           </button>

//         </div>

//       </header>


//       <main className="mx-auto max-w-7xl px-6 py-8">

//         <div className="grid gap-8 lg:grid-cols-3">

//           <section className="lg:col-span-2">

//             <div className="rounded-2xl bg-white p-6 shadow-sm">

//               <div className="flex items-center justify-between">

//                 <div>

//                   <h2 className="text-xl font-bold text-slate-900">
//                     Review Your Code
//                   </h2>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Paste your code and let AI find bugs and improvements.
//                   </p>

//                 </div>


//                 <select
//                   value={language}
//                   onChange={(event) => setLanguage(event.target.value)}
//                   className="rounded-lg border border-slate-300 px-3 py-2"
//                 >

//                   <option value="python">Python</option>
//                   <option value="javascript">JavaScript</option>
//                   <option value="typescript">TypeScript</option>
//                   <option value="java">Java</option>
//                   <option value="cpp">C++</option>
//                   <option value="c">C</option>
//                   <option value="go">Go</option>

//                 </select>

//               </div>


//               <textarea
//                 value={code}
//                 onChange={(event) => setCode(event.target.value)}
//                 className="mt-6 h-96 w-full resize-none rounded-xl border border-slate-300 bg-slate-950 p-5 text-sm leading-6 text-white outline-none focus:border-blue-500"
//                 spellCheck="false"
//               />


//               {error && (
//                 <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
//                   {error}
//                 </div>
//               )}


//               <button
//                 onClick={handleReview}
//                 disabled={loading}
//                 className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {loading ? "Analyzing Code..." : "Review Code"}
//               </button>

//             </div>


//             {review && (

//               <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

//                 <h2 className="text-xl font-bold text-slate-900">
//                   AI Review
//                 </h2>


//                 <div className="mt-6">

//                   <ReactMarkdown>
//                     {review}
//                   </ReactMarkdown>

//                 </div>

//               </div>

//             )}

//           </section>


//           <aside>

//             <div className="rounded-2xl bg-white p-6 shadow-sm">

//               <h2 className="text-xl font-bold text-slate-900">
//                 Review History
//               </h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 Your previous code reviews
//               </p>


//               <div className="mt-6 space-y-4">

//                 {reviews.length === 0 && (

//                   <p className="text-sm text-slate-500">
//                     No reviews yet.
//                   </p>

//                 )}


//                 {reviews.map((item) => (

//                   <div
//                     key={item.id}
//                     className="rounded-xl border border-slate-200 p-4"
//                   >

//                     <div className="flex items-center justify-between">

//                       <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
//                         {item.language}
//                       </span>

//                       <span className="text-xs text-slate-400">
//                         Review #{item.id}
//                       </span>

//                     </div>


//                     <p className="mt-3 text-xs text-slate-600">
//                       {item.code}
//                     </p>

//                   </div>

//                 ))}

//               </div>

//             </div>

//           </aside>

//         </div>

//       </main>

//     </div>
//   )
// }


// export default Dashboard

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"

import {
  createReview,
  getReviews
} from "../api"


function Dashboard() {

  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const [language, setLanguage] = useState("python")

  const [code, setCode] = useState(
`def add(a, b):
    return a - b`
  )

  const [review, setReview] = useState("")
  const [reviews, setReviews] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  useEffect(() => {

    const loadReviews = async () => {

      try {

        const data = await getReviews(token)

        setReviews(data)

      } catch (error) {

        console.error(error)

      }

    }

    loadReviews()

  }, [token])


  const handleReview = async () => {

    if (!code.trim()) {

      setError("Please enter some code.")

      return

    }

    setError("")
    setReview("")
    setLoading(true)

    try {

      const data = await createReview(
        language,
        code,
        token
      )

      setReview(data.review)

      setReviews((previousReviews) => [
        data,
        ...previousReviews
      ])

    } catch (error) {

      if (error.response?.data?.detail) {

        setError(error.response.data.detail)

      } else {

        setError("Failed to review code. Please try again.")

      }

    } finally {

      setLoading(false)

    }

  }


  const handleLogout = () => {

    localStorage.removeItem("token")

    navigate("/login")

  }


  const handleHistoryClick = (item) => {

    setLanguage(item.language)

    setCode(item.code)

    setReview(item.review)

    setError("")

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

  }


  const handleClearReview = () => {

    setReview("")
    setError("")

  }


  const formatDate = (date) => {

    if (!date) {
      return ""
    }

    try {

      return new Date(date).toLocaleString()

    } catch {

      return ""

    }

  }


  return (

    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <header className="border-b bg-slate-950 text-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div>

            <h1 className="text-xl font-bold">
              AI Code Review
            </h1>

            <p className="text-sm text-slate-400">
              Analyze your code with AI
            </p>

          </div>


          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-600 px-4 py-2 text-sm transition hover:bg-slate-800"
          >
            Logout
          </button>

        </div>

      </header>


      {/* Main */}

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Dashboard statistics */}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <p className="text-sm text-slate-500">
              Total Reviews
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {reviews.length}
            </p>

          </div>


          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <p className="text-sm text-slate-500">
              Current Language
            </p>

            <p className="mt-2 text-2xl font-bold capitalize text-slate-900">
              {language}
            </p>

          </div>


          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <p className="text-sm text-slate-500">
              AI Status
            </p>

            <div className="mt-2 flex items-center gap-2">

              <span className="h-3 w-3 rounded-full bg-green-500"></span>

              <p className="font-semibold text-green-600">
                Ready
              </p>

            </div>

          </div>

        </div>


        <div className="grid gap-8 lg:grid-cols-3">


          {/* LEFT SIDE */}

          <section className="lg:col-span-2">


            {/* Code editor card */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">


              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Review Your Code
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Paste your code and let AI find bugs,
                    security issues and improvements.
                  </p>

                </div>


                <select
                  value={language}
                  onChange={(event) =>
                    setLanguage(event.target.value)
                  }
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
                >

                  <option value="python">
                    Python
                  </option>

                  <option value="javascript">
                    JavaScript
                  </option>

                  <option value="typescript">
                    TypeScript
                  </option>

                  <option value="java">
                    Java
                  </option>

                  <option value="cpp">
                    C++
                  </option>

                  <option value="c">
                    C
                  </option>

                  <option value="go">
                    Go
                  </option>

                </select>

              </div>


              {/* Code editor */}

              <div className="mt-6 overflow-hidden rounded-xl border border-slate-700">

                <div className="flex items-center justify-between bg-slate-900 px-4 py-2">

                  <div className="flex items-center gap-2">

                    <span className="h-3 w-3 rounded-full bg-red-500"></span>

                    <span className="h-3 w-3 rounded-full bg-yellow-500"></span>

                    <span className="h-3 w-3 rounded-full bg-green-500"></span>

                  </div>


                  <span className="text-xs font-medium uppercase text-slate-400">
                    {language}
                  </span>

                </div>


                <textarea
                  value={code}
                  onChange={(event) =>
                    setCode(event.target.value)
                  }
                  className="h-96 w-full resize-none bg-slate-950 p-5 font-mono text-sm leading-6 text-slate-100 outline-none"
                  spellCheck="false"
                  placeholder="Paste your code here..."
                />

              </div>


              {/* Error */}

              {error && (

                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">

                  <p className="text-sm font-medium text-red-700">
                    {error}
                  </p>

                </div>

              )}


              {/* Review button */}

              <button
                onClick={handleReview}
                disabled={loading}
                className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {loading ? (
                  <span className="flex items-center justify-center gap-2">

                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>

                    Analyzing Code...

                  </span>
                ) : (
                  "Review Code"
                )}

              </button>

            </div>


            {/* AI Review */}

            {review && (

              <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between border-b border-slate-200 pb-4">

                  <div>

                    <h2 className="text-xl font-bold text-slate-900">
                      AI Review
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Analysis generated by AI
                    </p>

                  </div>


                  <button
                    onClick={handleClearReview}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
                  >
                    Clear
                  </button>

                </div>


                {/* Markdown output */}

                <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700">

                  <ReactMarkdown
                    components={{

                      h2: ({ children }) => (
                        <h2 className="mt-6 border-b border-slate-200 pb-2 text-lg font-bold text-slate-900">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="mt-5 text-base font-bold text-slate-900">
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p className="mt-2">
                          {children}
                        </p>
                      ),

                      ul: ({ children }) => (
                        <ul className="mt-3 list-disc space-y-2 pl-6">
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol className="mt-3 list-decimal space-y-2 pl-6">
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li>
                          {children}
                        </li>
                      ),

                      code: ({ inline, children }) => {

                        if (inline) {

                          return (
                            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-blue-700">
                              {children}
                            </code>
                          )

                        }

                        return (
                          <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-100">
                            <code>
                              {children}
                            </code>
                          </pre>
                        )

                      }

                    }}
                  >
                    {review}
                  </ReactMarkdown>

                </div>

              </div>

            )}

          </section>


          {/* RIGHT SIDE */}

          <aside>

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-slate-900">
                Review History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Click a review to open it again.
              </p>


              <div className="mt-6 space-y-3">

                {reviews.length === 0 && (

                  <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">

                    <p className="text-sm text-slate-500">
                      No reviews yet.
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Your previous reviews will appear here.
                    </p>

                  </div>

                )}


                {reviews.map((item) => (

                  <button
                    key={item.id}
                    onClick={() => handleHistoryClick(item)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                  >

                    <div className="flex items-center justify-between gap-3">

                      <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold capitalize text-blue-600">
                        {item.language}
                      </span>

                      <span className="text-xs text-slate-400">
                        #{item.id}
                      </span>

                    </div>


                    <pre className="mt-3 max-h-24 overflow-hidden whitespace-pre-wrap break-words font-mono text-xs leading-5 text-slate-600">
                      {item.code}
                    </pre>


                    {item.created_at && (

                      <p className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-400">
                        {formatDate(item.created_at)}
                      </p>

                    )}

                  </button>

                ))}

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>

  )

}


export default Dashboard