import { useState } from "react";
import { User, ThumbsUp, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Comment {
  id: string;
  name: string;
  content: string;
  date: string;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: string;
  name: string;
  content: string;
  date: string;
}

interface CommentSectionProps {
  articleId: string;
  articleTitle: string;
}

// Dummy comments data
const dummyComments: Comment[] = [
  {
    id: "1",
    name: "Ahmad Surya",
    content: "Sangat bangga dengan pencapaian PT. Mitra Mutiara Sejahtera! Semoga terus berkontribusi untuk pembangunan berkelanjutan di Indonesia.",
    date: "2 hari lalu",
    likes: 12,
    replies: [
      {
        id: "1-1",
        name: "Dewi Lestari",
        content: "Setuju! Ini menunjukkan komitmen perusahaan terhadap lingkungan.",
        date: "1 hari lalu",
      },
    ],
  },
  {
    id: "2",
    name: "Budi Santoso",
    content: "Artikel yang sangat informatif. Saya tertarik dengan program kemitraan yang disebutkan. Bagaimana cara bergabung sebagai petani mitra?",
    date: "3 hari lalu",
    likes: 8,
    replies: [],
  },
  {
    id: "3",
    name: "Siti Rahayu",
    content: "Senang melihat perusahaan yang peduli dengan masyarakat sekitar. Program CSR pendidikan sangat membantu anak-anak di desa kami.",
    date: "5 hari lalu",
    likes: 15,
    replies: [
      {
        id: "3-1",
        name: "Hendra Wijaya",
        content: "Benar sekali! Anak saya juga mendapat beasiswa dari program ini.",
        date: "4 hari lalu",
      },
      {
        id: "3-2",
        name: "Admin MMS",
        content: "Terima kasih atas apresiasi dan partisipasinya. Kami berkomitmen untuk terus mendukung pendidikan di wilayah operasional.",
        date: "3 hari lalu",
      },
    ],
  },
];

const CommentSection = ({ articleId, articleTitle }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(dummyComments);
  const [newComment, setNewComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyName, setReplyName] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !commenterName.trim()) {
      toast.error("Silakan isi nama dan komentar Anda");
      return;
    }

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      name: commenterName,
      content: newComment,
      date: "Baru saja",
      likes: 0,
      replies: [],
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
    setCommenterName("");
    toast.success("Komentar berhasil ditambahkan!");
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim() || !replyName.trim()) {
      toast.error("Silakan isi nama dan balasan Anda");
      return;
    }

    const newReply: Reply = {
      id: Date.now().toString(),
      name: replyName,
      content: replyContent,
      date: "Baru saja",
    };

    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );

    setReplyingTo(null);
    setReplyContent("");
    setReplyName("");
    toast.success("Balasan berhasil ditambahkan!");
  };

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <MessageCircle className="h-6 w-6 text-primary" />
        <h3 className="font-display text-2xl font-bold text-foreground">
          Komentar ({comments.length})
        </h3>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="bg-muted/30 rounded-xl p-6 space-y-4">
        <h4 className="font-semibold text-foreground">Tinggalkan Komentar</h4>
        <Input
          placeholder="Nama Anda"
          value={commenterName}
          onChange={(e) => setCommenterName(e.target.value)}
          className="bg-background"
        />
        <Textarea
          placeholder="Tulis komentar Anda..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          className="bg-background resize-none"
        />
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          <Send className="h-4 w-4 mr-2" />
          Kirim Komentar
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            {/* Main Comment */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(comment.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-foreground">{comment.name}</span>
                    <span className="text-sm text-muted-foreground">• {comment.date}</span>
                  </div>
                  <p className="text-foreground/80 mb-4">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{comment.likes}</span>
                    </button>
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Balas</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Reply Form */}
              {replyingTo === comment.id && (
                <div className="mt-4 ml-16 space-y-3">
                  <Input
                    placeholder="Nama Anda"
                    value={replyName}
                    onChange={(e) => setReplyName(e.target.value)}
                    className="bg-muted/30"
                  />
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Tulis balasan..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows={2}
                      className="flex-1 bg-muted/30 resize-none"
                    />
                    <Button
                      onClick={() => handleSubmitReply(comment.id)}
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="ml-8 space-y-3">
                {comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="bg-muted/30 border border-border/50 rounded-xl p-4"
                  >
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-secondary/20 text-secondary-foreground text-sm font-semibold">
                          {getInitials(reply.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground text-sm">
                            {reply.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            • {reply.date}
                          </span>
                        </div>
                        <p className="text-foreground/80 text-sm">{reply.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
