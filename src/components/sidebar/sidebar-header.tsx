import { Store } from "lucide-react"

interface SidebarHeaderProps {
  title?: string
  subtitle?: string
  logo?: React.ComponentType<{ className?: string }>
}

export function SidebarHeader({ 
  title = "PlayableFactory", 
  subtitle = "Admin Panel",
  logo: Logo = Store 
}: SidebarHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <Logo className="h-4 w-4 text-primary-foreground" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </div>
    </div>
  )
} 