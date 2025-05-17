import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const activeUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Editor",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Viewer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Commenter",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];
export default function UsersPanel({}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center ml-4 cursor-pointer">
          <div className="flex -space-x-2">
            {activeUsers.map((user, index) => (
              <Avatar key={user.id} className="border-2 border-white h-8 w-8">
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">People with access</h3>
            <Badge variant="outline" className="text-xs">
              {activeUsers.length} active
            </Badge>
          </div>
          <div className="space-y-3">
            {activeUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback style={{ backgroundColor: user.color }}>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {user.role}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
