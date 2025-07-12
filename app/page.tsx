"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Moon, Sun, Copy, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import NewPromptModal from "@/components/NewPromptModal" // Import NewPromptModal

interface Prompt {
  id: string
  title: string
  description: string
  fullPrompt: string
  model: string
  tags: string[]
  isFavorite: boolean
  isPersonal: boolean
}

const initialPrompts: Prompt[] = [
  {
    id: "1",
    title: "Code Review Assistant",
    description: "Analyze code for bugs, performance issues, and best practices",
    fullPrompt:
      "You are an expert code reviewer. Analyze the following code for bugs, performance issues, security vulnerabilities, and adherence to best practices. Provide specific suggestions for improvement.",
    model: "GPT-4",
    tags: ["coding", "review", "debugging"],
    isFavorite: true,
    isPersonal: false,
  },
  {
    id: "2",
    title: "Creative Writing Coach",
    description: "Help improve creative writing with detailed feedback",
    fullPrompt:
      "You are a creative writing coach. Help me improve my writing by providing constructive feedback on style, character development, plot structure, and narrative flow.",
    model: "Claude",
    tags: ["writing", "creative", "feedback"],
    isFavorite: false,
    isPersonal: false,
  },
  {
    id: "3",
    title: "Data Analysis Expert",
    description: "Analyze datasets and provide insights with visualizations",
    fullPrompt:
      "You are a data analysis expert. Help me analyze this dataset, identify patterns, trends, and anomalies. Suggest appropriate visualizations and provide actionable insights.",
    model: "Gemini",
    tags: ["data", "analysis", "insights"],
    isFavorite: true,
    isPersonal: true,
  },
  {
    id: "4",
    title: "UI/UX Design Consultant",
    description: "Provide design feedback and improvement suggestions",
    fullPrompt:
      "You are a UI/UX design consultant. Review this design and provide feedback on usability, accessibility, visual hierarchy, and user experience. Suggest specific improvements.",
    model: "GPT-4",
    tags: ["design", "ui", "ux", "feedback"],
    isFavorite: false,
    isPersonal: false,
  },
  {
    id: "5",
    title: "Marketing Copy Generator",
    description: "Create compelling marketing copy for various platforms",
    fullPrompt:
      "You are a marketing copywriter. Create compelling, persuasive copy that converts. Focus on benefits over features, use emotional triggers, and include clear calls-to-action.",
    model: "Claude",
    tags: ["marketing", "copywriting", "conversion"],
    isFavorite: true,
    isPersonal: false,
  },
  {
    id: "6",
    title: "Technical Documentation Writer",
    description: "Transform complex technical concepts into clear documentation",
    fullPrompt:
      "You are a technical documentation specialist. Transform complex technical information into clear, concise, and user-friendly documentation. Use examples, diagrams, and step-by-step instructions.",
    model: "Gemini",
    tags: ["documentation", "technical", "writing"],
    isFavorite: false,
    isPersonal: true,
  },
]

const models = ["All Models", "GPT-4", "Claude", "Gemini"]
const categories = ["All", "Favorites", "Personal"]
const allTags = [
  "coding",
  "review",
  "debugging",
  "writing",
  "creative",
  "feedback",
  "data",
  "analysis",
  "insights",
  "design",
  "ui",
  "ux",
  "marketing",
  "copywriting",
  "conversion",
  "documentation",
  "technical",
]

// Function to estimate token count
function estimateTokenCount(text: string): number {
  // Simple estimation: roughly 4 characters per token
  return Math.ceil(text.length / 4)
}

// Animated Background Component
function AnimatedBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0">
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full opacity-20 animate-pulse",
              theme === "dark" ? "bg-blue-400" : "bg-blue-600",
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}

        {/* Floating blobs */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`blob-${i}`}
            className={cn(
              "absolute rounded-full blur-xl opacity-10 animate-bounce",
              theme === "dark" ? "bg-purple-500" : "bg-purple-400",
            )}
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Header Component
function Header({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (query: string) => void }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PromptBox
              </h1>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 backdrop-blur-sm border-muted-foreground/20 rounded-full"
                />
              </div>
            </div>

            {/* Theme Toggle Placeholder */}
            <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PromptBox
            </h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 backdrop-blur-sm border-muted-foreground/20 rounded-full"
              />
            </div>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full transition-all duration-300 hover:scale-110"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 transition-all duration-300" />
            ) : (
              <Moon className="h-5 w-5 transition-all duration-300" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

// Sidebar Component
function Sidebar({
  selectedModel,
  setSelectedModel,
  selectedCategory,
  setSelectedCategory,
  selectedTags,
  setSelectedTags,
}: {
  selectedModel: string
  setSelectedModel: (model: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
}) {
  const toggleTag = (tag: string) => {
    setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag])
  }

  return (
    <aside className="w-80 p-6 border-r bg-background/50 backdrop-blur-sm">
      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h3 className="font-semibold mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                className="w-full justify-start transition-all duration-200 hover:scale-105"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Model Filter */}
        <div>
          <h3 className="font-semibold mb-3">Model</h3>
          <div className="space-y-2">
            {models.map((model) => (
              <Button
                key={model}
                variant={selectedModel === model ? "default" : "ghost"}
                className="w-full justify-start transition-all duration-200 hover:scale-105"
                onClick={() => setSelectedModel(model)}
              >
                {model}
              </Button>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        <div>
          <h3 className="font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer transition-all duration-200 hover:scale-110"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

// Prompt Card Component
function PromptCard({
  prompt,
  onToggleFavorite,
  onCopy,
  onPreview,
}: {
  prompt: Prompt
  onToggleFavorite: (id: string) => void
  onCopy: (text: string) => void
  onPreview: (prompt: Prompt) => void
}) {
  const getModelColor = (model: string) => {
    switch (model) {
      case "GPT-4":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Claude":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Gemini":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open preview if clicking on interactive elements
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    onPreview(prompt)
  }

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-background/50 backdrop-blur-sm border-muted-foreground/20 cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{prompt.title}</CardTitle>
            <Badge className={cn("text-xs", getModelColor(prompt.model))}>{prompt.model}</Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(prompt.id)
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Star className={cn("h-4 w-4", prompt.isFavorite && "fill-yellow-400 text-yellow-400")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 line-clamp-2">{prompt.description}</CardDescription>

        <div className="flex flex-wrap gap-1 mb-4">
          {prompt.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {prompt.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{prompt.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onCopy(prompt.fullPrompt)
            }}
            className="flex-1"
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Prompt Preview Modal Component
function PromptPreviewModal({
  prompt,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onCopy,
  onSave,
  isEditMode,
  setIsEditMode,
}: {
  prompt: Prompt | null
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  onDelete: (id: string) => void
  onCopy: (text: string) => void
  onSave: (updatedPrompt: Prompt) => void
  isEditMode: boolean
  setIsEditMode: (mode: boolean) => void
}) {
  const [editedPrompt, setEditedPrompt] = useState<Prompt | null>(null)

  useEffect(() => {
    if (prompt) {
      setEditedPrompt({ ...prompt })
    }
  }, [prompt])

  if (!prompt || !editedPrompt) return null

  const getModelColor = (model: string) => {
    switch (model) {
      case "GPT-4":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Claude":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Gemini":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const handleSave = () => {
    onSave(editedPrompt)
    setIsEditMode(false)
  }

  const handleCancel = () => {
    setEditedPrompt({ ...prompt })
    setIsEditMode(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-xl">
            {isEditMode ? (
              <Input
                value={editedPrompt.title}
                onChange={(e) => setEditedPrompt({ ...editedPrompt, title: e.target.value })}
                className="text-xl font-semibold"
              />
            ) : (
              prompt.title
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Model and Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {isEditMode ? (
              <Select
                value={editedPrompt.model}
                onValueChange={(value) => setEditedPrompt({ ...editedPrompt, model: value })}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GPT-4">GPT-4</SelectItem>
                  <SelectItem value="Claude">Claude</SelectItem>
                  <SelectItem value="Gemini">Gemini</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge className={cn("text-sm", getModelColor(prompt.model))}>{prompt.model}</Badge>
            )}

            {isEditMode ? (
              <Input
                value={editedPrompt.tags.join(", ")}
                onChange={(e) =>
                  setEditedPrompt({
                    ...editedPrompt,
                    tags: e.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="Tags (comma-separated)"
                className="flex-1"
              />
            ) : (
              prompt.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))
            )}
          </div>

          {/* Description */}
          {isEditMode ? (
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={editedPrompt.description}
                onChange={(e) => setEditedPrompt({ ...editedPrompt, description: e.target.value })}
                placeholder="Brief description..."
              />
            </div>
          ) : (
            <p className="text-muted-foreground">{prompt.description}</p>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📊 ~{estimateTokenCount(prompt.fullPrompt)} tokens</span>
            <span>📅 {prompt.isPersonal ? "Personal" : "Public"}</span>
          </div>

          {/* Full Prompt */}
          <div>
            <Label className="text-base font-semibold">Full Prompt</Label>
            {isEditMode ? (
              <Textarea
                value={editedPrompt.fullPrompt}
                onChange={(e) => setEditedPrompt({ ...editedPrompt, fullPrompt: e.target.value })}
                rows={12}
                className="mt-2 font-mono text-sm"
              />
            ) : (
              <pre className="mt-2 p-4 bg-muted rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto border">
                {prompt.fullPrompt}
              </pre>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 flex justify-between items-center pt-4 border-t">
          {isEditMode ? (
            <div className="flex gap-2 w-full">
              <Button onClick={handleSave} className="flex-1">
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onCopy(prompt.fullPrompt)}>
                  📋 Copy Prompt
                </Button>
                <Button variant="outline" onClick={onEdit}>
                  ✏️ Edit
                </Button>
                <Button variant="destructive" onClick={() => onDelete(prompt.id)}>
                  🗑️ Delete
                </Button>
              </div>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function PromptBoxApp() {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModel, setSelectedModel] = useState("All Models")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const [previewPrompt, setPreviewPrompt] = useState<Prompt | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleDeletePrompt = (id: string) => {
    setPrompts(prompts.filter((prompt) => prompt.id !== id))
    setPreviewPrompt(null)
  }

  // Filter prompts
  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesModel = selectedModel === "All Models" || prompt.model === selectedModel

    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Favorites" && prompt.isFavorite) ||
      (selectedCategory === "Personal" && prompt.isPersonal)

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => prompt.tags.includes(tag))

    return matchesSearch && matchesModel && matchesCategory && matchesTags
  })

  const handleToggleFavorite = (id: string) => {
    setPrompts(prompts.map((prompt) => (prompt.id === id ? { ...prompt, isFavorite: !prompt.isFavorite } : prompt)))
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleAddPrompt = (newPrompt: Omit<Prompt, "id">) => {
    const prompt: Prompt = {
      ...newPrompt,
      id: Date.now().toString(),
    }
    setPrompts([prompt, ...prompts])
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <AnimatedBackground />

      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="flex">
        <Sidebar
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onToggleFavorite={handleToggleFavorite}
                onCopy={handleCopy}
                onPreview={setPreviewPrompt}
              />
            ))}
          </div>

          {filteredPrompts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No prompts found matching your criteria.</p>
            </div>
          )}
        </main>



      </div>

      <NewPromptModal onAddPrompt={handleAddPrompt} />

      <PromptPreviewModal
        prompt={previewPrompt}
        isOpen={!!previewPrompt}
        onClose={() => {
          setPreviewPrompt(null)
          setIsEditMode(false)
        }}
        onEdit={() => setIsEditMode(true)}
        onDelete={handleDeletePrompt}
        onCopy={handleCopy}
        onSave={(updatedPrompt) => {
          setPrompts(prompts.map((p) => (p.id === updatedPrompt.id ? updatedPrompt : p)))
          setPreviewPrompt(updatedPrompt)
        }}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />

      {/* Footer */}
      <footer
          className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-10 pb-16 text-center text-sm text-slate-500 dark:text-slate-400 transition-all duration-300">
        <div className="container mx-auto px-4">
          <p>
            Built with ❤️ by{" "}
            <a
                href="https://julianb.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors"
            >
              Julian
            </a>{" "}
            · DevDrops {new Date().getFullYear()}
          </p>
          <div className="mt-4 flex justify-center gap-4 text-slate-400 dark:text-slate-500">
            <a
                href="https://github.com/1Jul1an"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
            <a
                href="mailto:julianbusinessadress@gmail.com"
                className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
