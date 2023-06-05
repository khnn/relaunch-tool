"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"

export default function Questionnaire() {
  const [answers, setAnswers] = useState<{
    codeKnowledge: [number]
    contentChanges: [number]
  }>({
    codeKnowledge: [0],
    contentChanges: [0],
  })

  const currentProgress =
    (answers.codeKnowledge ? 50 : 0) + (answers.contentChanges ? 50 : 0)

  const knowledgeMapping = [
    "I don't know any coding",
    "I know a little bit",
    "I know a lot",
    "I'm a pro",
    "I'm a master",
  ]

  const contentMapping = [
    "Very few updates, maybe once a year",
    "A few updates, maybe once a month",
    "A lot of updates, maybe once a week",
    "A lot of updates, maybe once a day",
    "A lot of updates, maybe multiple times a day",
  ]
  /* TODO

  - DB?
  - Hosting?
  - SSR? SPA? SSG?
  - SEO?
  - Fixed Hosting? Security Concerns?
  - Labels

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
            value={answers.codeKnowledge}
            className="mt-8"
            onValueChange={(value: [number]) => {
              setAnswers({ ...answers, codeKnowledge: value })
            }}
            min={0}
            max={4}
          />
          {answers.codeKnowledge && (
            <p className="mt-4 text-sm text-gray-500">
              {knowledgeMapping[answers.codeKnowledge[0]]}
            </p>
          )}
        </TabsContent>
        <TabsContent value="content">
          <Slider
            value={answers.contentChanges}
            className="mt-8"
            onValueChange={(value: [number]) => {
              setAnswers({ ...answers, contentChanges: value })
            }}
            min={0}
            max={4}
          />
          {answers.contentChanges && (
            <p className="mt-4 text-sm text-gray-500">
              {contentMapping[answers.contentChanges[0]]}
            </p>
          )}
        </TabsContent>
      </Tabs>
    </>
  )
}
