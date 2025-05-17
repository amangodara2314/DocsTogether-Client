import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, X } from "lucide-react";

export default function CommentsPanel({ currentUser, onClose }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: "1",
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        color: "#4f46e5",
      },
      text: "I think we should revise this section to be more concise.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      resolved: false,
    },
    {
      id: "2",
      user: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        color: "#10b981",
      },
      text: "Great work on the introduction! Very clear and engaging.",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      resolved: true,
    },
  ]);

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      user: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        color: currentUser.color,
      },
      text: newComment,
      timestamp: new Date(),
      resolved: false,
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const toggleResolve = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? { ...comment, resolved: !comment.resolved }
          : comment
      )
    );
  };

  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className="w-80 border-l h-full flex flex-col bg-white">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <h3 className="font-medium text-sm">Comments</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-3 border-b">
        <div className="flex gap-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[60px] text-sm resize-none"
          />
        </div>
        <div className="flex justify-end mt-2">
          <Button size="sm" onClick={addComment} disabled={!newComment.trim()}>
            <Send className="h-3 w-3 mr-1" />
            Comment
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {comments.length === 0 ? (
          <div className="text-center text-gray-500 text-sm p-4">
            No comments yet
          </div>
        ) : (
          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`p-3 rounded-md border ${
                  comment.resolved ? "bg-gray-50 opacity-70" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={comment.user.avatar || "/placeholder.svg"}
                        alt={comment.user.name}
                      />
                      <AvatarFallback
                        style={{ backgroundColor: comment.user.color }}
                      >
                        {comment.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">
                      {comment.user.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatTime(comment.timestamp)}
                  </span>
                </div>

                <p className="text-sm mb-2">{comment.text}</p>

                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleResolve(comment.id)}
                    className="h-6 text-xs"
                  >
                    {comment.resolved ? "Reopen" : "Resolve"}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteComment(comment.id)}
                    className="h-6 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
