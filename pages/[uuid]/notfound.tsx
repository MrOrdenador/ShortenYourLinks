"use client"
import { useState, useEffect } from "react"
import { Discord, Github, XformerlyTwitter } from "@/lib/icons"
import Link from "next/link"
const sentences = [
  "The link you were looking for was not found...",
  "Oops! This link seems to have vanished into thin air.",
  "404 Error: Link not found. Did it take a wrong turn?",
  "We couldn't find your link... Maybe it's on vacation?",
  "This link is playing hide and seek. And it's winning!",
  "The link you seek is not here. Perhaps in another dimension?",
  "The link you desire is lost in the void.",
  "This link has gone missing. Time to call the link detectives!",
  "Uh-oh! The link you requested is nowhere to be found.",
  "The link you are looking for has disappeared. Poof!",
]

export default function NotFoundPage({ uuid }: { uuid?: string | null }) {
  const [sentence, setSentence] = useState("")

  useEffect(() => {
    const index = Math.floor(Math.random() * sentences.length)
    setSentence(sentences[index])
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen text-2xl bg-zinc-800 text-whitesmoke ">
      <h1 className="text-center px-4">{sentence}</h1>
      <h2 className="text-sm text-zinc-600">
        UUID: {uuid} -{" "} 
        <Link href="/" className="text-zinc-500">
          <u className="hover:text-blue-400 transition-colors duration-200">Go back</u>
        </Link>
      </h2>
      <footer className="absolute bottom-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="https://discord.com/users/@mrordenador">
            <Discord className="w-6 h-6 cursor-pointer" />
          </a>
          <a href="https://x.com/mr0rdenador">
            <XformerlyTwitter className="w-4.5 h-4.5 cursor-pointer" />
          </a>
          <a href="https://github.com/MrOrdenador">
            <Github className="w-5 h-5 cursor-pointer" />
          </a>
        </div>
      </footer>
    </div>
  )
}