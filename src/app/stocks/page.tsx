"use client"

import { Button } from "@/components/ui/button"
import { PlusCircleIcon } from "lucide-react"
import AddStockDialog from "./add-stock-dialog"
import { useState } from "react"

export default function Stocks() {
  const [open, setOpen] = useState(false)


  return (
    <div>
      <h1>Stocks</h1>
      <Button
        size="icon"
        onClick={() => setOpen(true)}
      >
        <PlusCircleIcon />
      </Button>
      <AddStockDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
