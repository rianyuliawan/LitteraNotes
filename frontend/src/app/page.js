"use client"
import React, { useEffect } from "react";
import { Spin, Empty } from 'antd';
import CardNote from "@/components/CardNote";
import { useNote } from "@/store/useNote"
import { useAuth } from "@/store/useAuth"

export default function Home() {
  const {token} = useAuth()
  const { items, loading, loadPublic } = useNote()

  useEffect(() => {
    loadPublic({ page:1, perPage: 12 })

  }, [loadPublic])

  const dataDummy = [
    {
      title: "Note Pertama Dummy",
      content: "<i>Content Dummy</i>",
      user: {
        profile: "/assets/image.png",
        username: "John Doe"
      },
      date: "12-12-2025 7:15PM"
    },
    {
      title: "Note Pertama Dummy",
      content: "<i>Content Dummy</i>",
      user: {
        profile: "/assets/image.png",
        username: "John Doe"
      },
      date: "12-12-2025 7:15PM"
    },
    {
      title: "Note Pertama Dummy",
      content: "<i>Content Dummy</i>",
      user: {
        profile: "/assets/image.png",
        username: "John Doe"
      },
      date: "12-12-2025 7:15PM"
    },
    {
      title: "Note Pertama Dummy",
      content: "<i>Content Dummy</i>",
      user: {
        profile: "/assets/image.png",
        username: "John Doe"
      },
      date: "12-12-2025 7:15PM"
    }
  ]

  if(loading){
    return <div className="py-10 flex justify-center"><Spin /></div>
  }

  if(!items.length){
    return <div className="py-10"><Empty /></div>
  }

  console.log(items)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {dataDummy.map((note, i) => (
        <div key={i}>
          <CardNote note={note} />
        </div>
      ))}
    </div>
  );
}
