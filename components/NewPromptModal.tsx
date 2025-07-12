"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

interface NewPromptModalProps {
  onAddPrompt: (prompt: {
    title: string
    description: string
    fullPrompt: string
    model: string
    tags: string[]
    isFavorite: boolean
    isPersonal: boolean
  }) => void
}

const models = ["GPT-4", "Claude", "Gemini"]

const NewPromptModal: React.FC<NewPromptModalProps> = ({ onAddPrompt }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fullPrompt, setFullPrompt] = useState("")
  const [model, setModel] = useState(models[0])
  const [tags, setTags] = useState("")
  const [isPersonal, setIsPersonal] = useState(false)

  const handleSubmit = () => {
    onAddPrompt({
      title,
      description,
      fullPrompt,
      model,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      isFavorite: false,
      isPersonal,
    })
    setOpen(false)
    setTitle("")
    setDescription("")
    setFullPrompt("")
    setModel(models[0])
    setTags("")
    setIsPersonal(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-6 right-6 rounded-full shadow-lg hover:scale-105 transition-transform bg-transparent"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Prompt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Prompt</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullPrompt" className="text-right">
              Full Prompt
            </Label>
            <Textarea
              id="fullPrompt"
              value={fullPrompt}
              onChange={(e) => setFullPrompt(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right">
              Model
            </Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="col-span-3"
              placeholder="coding, review, debugging"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isPersonal" className="text-right">
              Personal
            </Label>
            <input
              type="checkbox"
              id="isPersonal"
              checked={isPersonal}
              onChange={(e) => setIsPersonal(e.target.checked)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} className="ml-2">
            Add Prompt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewPromptModal
