"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

export default function Questionnaire() {
  const [answers, setAnswers] = useState<{
    codeKnowledge?: [number]
    contentChanges?: [number]
    limitations: string
  }>({
    codeKnowledge: undefined,
    contentChanges: undefined,
    limitations: "",
  })

  const currentProgress = () => {
    const { length } = Object.keys(answers)
    return (
      (answers.codeKnowledge ? 100 / length : 0) +
      (answers.contentChanges ? 100 / length : 0) +
      (answers.limitations !== "" ? 100 / length : 0)
    )
  }

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
  - If you can pick one: performance, budget, flexibility, ...
  - SSR? SPA? SSG?
  - Labels & Texts

  */

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">Questionnaire</h1>
      <p className="mb-8 text-gray-500">
        This questionnaire will help us to understand your needs and to provide
        you with the best possible solution. All techsteck will offer you a good
        solution for SEO, ...
      </p>
      <div className="w-96">
        <Progress className="mb-8" value={currentProgress()} />
        <Tabs defaultValue="kwowledge" className="">
          <TabsList>
            <TabsTrigger value="kwowledge">Coding knowledge</TabsTrigger>
            <TabsTrigger value="content">Content Changes</TabsTrigger>
            <TabsTrigger value="limitations">Limitations</TabsTrigger>
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
          <TabsContent value="limitations">
            <Textarea
              onChange={(e) => {
                setAnswers({ ...answers, limitations: e.target.value })
              }}
              value={answers.limitations}
              placeholder="Any limitations or predefined fixed requirements like hosting."
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
