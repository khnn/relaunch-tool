"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"

export default function Questionnaire() {
  const [answers, setAnswers] = useState({
    codeKnowledge: null,
    contentChanges: null,
  })

  const currentProgress =
    (answers.codeKnowledge ? 50 : 0) + (answers.contentChanges ? 50 : 0)

  /* TODO

  - DB?
  - Hosting?
  - SSR? SPA? SSG?

  */

  return (
    <>
      <Progress className="mb-8" value={currentProgress} />
      <Tabs defaultValue="kwowledge" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="kwowledge">Coding knowledge</TabsTrigger>
          <TabsTrigger value="content">Content Changes</TabsTrigger>
        </TabsList>
        <TabsContent value="kwowledge">
          <Slider
            value={[answers.codeKnowledge]}
            className="mt-8"
            onValueChange={(value: number[]) => {
              setAnswers({ ...answers, codeKnowledge: value })
            }}
            min={0}
            max={5}
          />
        </TabsContent>
        <TabsContent value="content">
          <Slider
            value={[answers.contentChanges]}
            className="mt-8"
            onValueChange={(value: number[]) => {
              setAnswers({ ...answers, contentChanges: value })
            }}
            min={0}
            max={5}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}
