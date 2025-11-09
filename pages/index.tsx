"use client"

import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { generateShortId } from "@/lib/UUIDsGenerator"
import Link from "next/link"
import { Discord, Github, XformerlyTwitter } from "@/lib/icons"
import { Clipboard } from "lucide-react"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [lastId, setLastId] = useState<string | null>(null)
  const [link, setLink] = useState("")

  const handleAdd = async (link: string) => {
    setLoading(true)

    if (!/^https:\/\/.+\..+/.test(link)) {
      toast.error('Link must be a valid URL starting with "https://"', {
        style: { background: "#3F3F46", color: "#EDEDED" },
      })
      setLoading(false)
      return
    }

    const uuid = generateShortId(7)

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uuid, link }),
      })

      const result = await res.json()

      if (res.ok) {
        setLastId(uuid)
        setLink("")
        toast.success("Short link created!", {
          style: { background: "#3F3F46", color: "#EDEDED" },
        })
      } else {
        toast.error("Error: " + result.error, {
          style: { background: "#3F3F46", color: "#EDEDED" },
        })
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : (() => {
              try {
                return JSON.stringify(error)
              } catch {
                return "Unknown error"
              }
            })()

      toast.error("Unexpected error: " + message, {
        style: { background: "#3F3F46", color: "#EDEDED" },
      })
    }

    setLoading(false)
  }

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="min-h-screen flex flex-col lg:flex-row bg-zinc-700">

        <aside
          className="
            lg:w-2/5 
            bg-zinc-800 
            p-8 lg:p-12 
            flex flex-col 
            justify-center 
            border-t-2 border-zinc-900 
            lg:border-t-0 lg:border-r-4 
            fixed bottom-0 left-0 right-0 
            lg:relative 
            z-50
          "
        >
          <div className="hidden lg:block max-w-md mx-auto lg:mx-0">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-zinc-100 mb-4 leading-tight">
                Shorten Your Links
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed">
                This is a small project to create short links easily and quickly, built with Next.js, TypeScript and
                Supabase.
                <br />
                I made this project for my{" "}
                <span className="text-xl text-zinc-300">
                  <Link
                    href={"https://mrordenador.vercel.app"}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    <u>portfolio</u>
                  </Link>
                </span>{" "}
                because I had no projects to showcase.
                <br />
                <br />
                I do not have big plans for it, but I might add accounts so the database does not get exploded with requests.
                <br />
                <br />
                Although this is not a big project, feel free to try it out!
                <br />
                <span className="text-sm text-zinc-600">(and maybe use it for real if you want to) :)</span>
              </p>
            </div>
          </div>

          <footer className="hidden lg:flex w-full max-w-md absolute bottom-4 items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg">
              <a href="https://discord.com/users/@mrordenador">
                <Discord className="w-7 h-7 cursor-pointer" />
              </a>
              <a href="https://x.com/mr0rdenador">
                <XformerlyTwitter className="w-5.5 h-5.5 cursor-pointer" />
              </a>
              <a href="https://github.com/MrOrdenador">
                <Github className="w-6 h-6 cursor-pointer" />
              </a>
            </div>
          </footer>

          <footer className="lg:hidden w-[90%] mx-auto -mt-2 flex items-center justify-around py-3 bg-zinc-800/90 border border-zinc-700 rounded-2xl shadow-lg backdrop-blur-md ">
            <a href="https://discord.com/users/@mrordenador" className="text-zinc-300 hover:text-blue-400 transition-colors">
              <Discord className="w-7 h-7" />
            </a>
            <a href="https://x.com/mr0rdenador" className="text-zinc-300 hover:text-blue-400 transition-colors">
              <XformerlyTwitter className="w-6 h-6" />
            </a>
            <a href="https://github.com/MrOrdenador" className="text-zinc-300 hover:text-blue-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </footer>
        </aside>

        <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 mt-20 lg:mt-0">

          <h1 className="lg:hidden text-4xl font-bold text-zinc-100 mb-6 text-center">
            Shorten Your Links 
          </h1>

          <div className="bg-zinc-800 p-8 lg:p-12 rounded-md w-full max-w-lg shadow-[4px_4px_0px_rgba(30,30,35,1)] border-2 border-zinc-700">
            <h2 className="text-2xl font-bold mb-2 text-zinc-100">Create Short Link</h2>
            <p className="text-zinc-400 mb-6 text-sm">
              Paste your long URL below and get a short link right away
            </p>

            <div className="space-y-4">
              <div>
                <input
                  id="url-input"
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Place your link here"
                  className="w-full p-4 border-2 border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent text-zinc-100 bg-zinc-700 placeholder-zinc-500
                      shadow-[4px_4px_0px_rgba(30,30,35,1)]
                      transition-all duration-200
                      hover:shadow-[2px_2px_0px_rgba(30,30,35,1)]
                  "
                />
              </div>

              <button
                onClick={() => handleAdd(link)}
                disabled={loading || !link}
                className={`w-full p-4 rounded-lg text-white font-semibold text-lg
                            shadow-[4px_4px_0px_rgba(30,30,35,1)]
                            transition-all duration-200 
                            ${
                              loading || !link
                                ? "bg-zinc-600 cursor-not-allowed shadow-none"
                                : "bg-zinc-600 hover:bg-zinc-700 hover:shadow-[2px_2px_0px_rgba(30,30,35,1)] active:shadow-none cursor-pointer"
                            }`}
              >
                {loading ? "Creating..." : "Shorten Link"}
              </button>
            </div>

            {lastId && (
              <div className="mt-6 p-5 bg-zinc-700 rounded-lg border-2 border-zinc-600 shadow-[3px_3px_0px_rgba(30,30,35,1)] relative">
                <button
                  onClick={() => {
                    const url = `${window.location.origin}/${lastId}`
                    navigator.clipboard.writeText(url)
                    toast.success("Copied to clipboard!", {
                      style: { background: "#3F3F46", color: "#EDEDED" },
                    })
                  }}
                  className="absolute top-3 right-3 p-2 bg-zinc-600 hover:bg-zinc-500 text-zinc-100 rounded transition-colors cursor-pointer"
                  aria-label="Copy to clipboard"
                >
                  <Clipboard className="w-4 h-4" />
                </button>

                <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wide mb-2">
                  Your Short Link
                </div>

                <Link
                  href={`/${lastId}`}
                  className="font-mono text-blue-400 hover:text-blue-300 break-all text-base block transition-colors pr-10"
                >
                  {typeof window !== "undefined" ? window.location.origin : ""}/{lastId}
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
