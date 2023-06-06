"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Questionnaire() {
  const [answers, setAnswers] = useState<{
    codeKnowledge?: [number]
    contentChanges?: [number]
    focus?: "performance" | "budget" | "flexibility"
  }>({
    codeKnowledge: undefined,
    contentChanges: undefined,
    focus: undefined,
  })

  const currentProgress = () => {
    const { length } = Object.keys(answers)
    return (
      (answers.codeKnowledge ? 100 / length : 0) +
      (answers.contentChanges ? 100 / length : 0) +
      (answers.focus ? 100 / length : 0)
    )
  }

  /* TODO

  - What size is the project? This is important to put the other answers in perspective.
  - Add limitations > Hosting, Security, ... This requires another interpretation of the answers.

  - DB?
  - Hosting?
  - SSR? SPA? SSG?
  - Labels & Texts

  */

  return (
    <>
      <div className="mb-8 flex items-center gap-10">
        <h1 className="text-4xl font-bold">Questionnaire</h1>
        <Progress value={currentProgress()} />
      </div>
      <p className="mb-8 text-gray-500">
        This questionnaire will help to understand your needs and to provide you
        with the best possible solution. All techsteck will offer you a good
        solution for SEO, ...
      </p>
      <div>
        <Tabs defaultValue="knowhow">
          <TabsList>
            <TabsTrigger value="knowhow">Coding knowhow</TabsTrigger>
            <TabsTrigger value="content">Content changes</TabsTrigger>
            <TabsTrigger value="focus">Focus</TabsTrigger>
            {/* <TabsTrigger value="limitations">Limitations</TabsTrigger> */}
          </TabsList>
          <TabsContent value="knowhow" className="rounded-lg border-2 p-4">
            <p className="mb-4 text-xl font-bold text-gray-500">
              How is the software engineering knowhow of you or your team?
            </p>
            <p className="my-4 text-sm text-gray-300">
              This is important to know if a no code solution is needed.
            </p>
            <p className="mt-4 text-sm">
              Update the slider to a value that fits your needs.
            </p>
            <Slider
              defaultValue={[2]}
              value={answers.codeKnowledge}
              className="mt-8"
              onValueChange={(value: [number]) => {
                setAnswers({ ...answers, codeKnowledge: value })
              }}
              min={0}
              max={4}
            />
            <div className="mt-4 flex justify-between text-xs text-gray-500">
              <div className="max-w-[200px]">
                I don&apos;t have any access to a developer or would need to
                hire one for every change.
              </div>
              <div className="max-w-[200px]">
                I&apos;m a developer myself, have a team of developers or
                generally access to software engineers.
              </div>
            </div>
          </TabsContent>
          <TabsContent value="content" className="rounded-lg border-2 p-4">
            <p className="mb-4 text-xl font-bold text-gray-500">
              How often do you want to change the content of your website?
            </p>
            <p className="my-4 text-sm text-gray-300">
              This is important to know if you want to use a CMS or not.
            </p>
            <p className="mt-4 text-sm">
              Update the slider to a value that fits your needs.
            </p>
            <Slider
              defaultValue={[2]}
              value={answers.contentChanges}
              className="mt-8"
              onValueChange={(value: [number]) => {
                setAnswers({ ...answers, contentChanges: value })
              }}
              min={0}
              max={4}
            />
            <div className="mt-4 flex justify-between text-xs text-gray-500">
              <div className="max-w-[200px]">
                Very few updates, maybe once a year or I feel comfortable with
                updating the code myself.
              </div>
              <div className="max-w-[200px]">
                A lot of updates, maybe once a day.
              </div>
            </div>
          </TabsContent>
          <TabsContent value="focus" className="rounded-lg border-2 p-4">
            <p className="mb-4 text-xl font-bold text-gray-500">
              Pick the most important aspect for you.
            </p>
            <p className="my-4 text-sm text-gray-300">
              This is important to balance out the first two aspects.
            </p>
            <div className="flex gap-2">
              {["performance", "budget", "flexibility"].map((focus) => (
                <Button
                  key={focus}
                  variant={answers.focus === focus ? undefined : "secondary"}
                  onClick={() => {
                    setAnswers({ ...answers, focus })
                  }}
                >
                  {focus.charAt(0).toUpperCase() + focus.slice(1)}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="limitations" className="rounded-lg border-2 p-4">
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
