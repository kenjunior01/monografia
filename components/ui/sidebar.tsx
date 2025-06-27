"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const SidebarContext = React.createContext<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void } | null>(null)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true)
  return <SidebarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const sidebarVariants = cva(
  "flex flex-col h-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition-all duration-300 ease-in-out",
  {
    variants: {
      isOpen: {
        true: "w-64",
        false: "w-16",
      },
    },
    defaultVariants: {
      isOpen: true,
    },
  }
)

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarVariants> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const { isOpen } = useSidebar()
  return <div className={cn(sidebarVariants({ isOpen }), className)} {...props} />
}

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 border-b border-gray-200 dark:border-gray-700", className)} {...props} />
}

export function SidebarBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-y-auto", className)} {...props} />
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 border-t border-gray-200 dark:border-gray-700", className)} {...props} />
}

const sidebarLinkVariants = cva(
  "flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer",
  {
    variants: {
      isActive: {
        true: "bg-gray-200 dark:bg-gray-700 font-semibold",
      },
    },
  }
)

export interface SidebarLinkProps extends React.HTMLAttributes<HTMLAnchorElement>, VariantProps<typeof sidebarLinkVariants> {
  icon?: React.ElementType
}

export function SidebarLink({ className, icon: Icon, isActive, ...props }: SidebarLinkProps) {
  const { isOpen } = useSidebar()
  return (
    <a className={cn(sidebarLinkVariants({ isActive }), className)} {...props}>
      {Icon && <Icon className="h-5 w-5" />}
      {isOpen && <span>{props.children}</span>}
    </a>
  )
}
