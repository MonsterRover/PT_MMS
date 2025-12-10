import { useState, useEffect } from "react";
import { User, MessageCircle, Send, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
  is_approved: boolean;
}

interface CommentSectionProps {
  newsId: string;
  articleTitle: string;
}

const commentSchema = z.object({
  name: z.string().trim().min(2, { message: 'Nama minimal 2 karakter' }).max(100),
  content: z.string().trim().min(10, { message: 'Komentar minimal 10 karakter' }).max(1000),
});

const CommentSection = ({ newsId, articleTitle }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    fetchComments();
  }, [newsId]);

  const fetchComments = async () => {
    setIsLoading(true);
    
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('news_id', newsId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setComments(data);
    }
    
    setIsLoading(false);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = commentSchema.safeParse({ name: commenterName, content: newComment });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from('comments')
      .insert({
        news_id: newsId,
        author_name: commenterName.trim(),
        content: newComment.trim(),
        is_approved: false,
      });

    setIsSubmitting(false);

    if (error) {
      toast.error('Gagal mengirim komentar. Silakan coba lagi.');
      return;
    }

    setNewComment("");
    setCommenterName("");
    setPendingCount(prev => prev + 1);
    toast.success('Komentar berhasil dikirim! Menunggu persetujuan admin.');
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hari ini';
    if (days === 1) return '1 hari lalu';
    if (days < 7) return `${days} hari lalu`;
    
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
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
          maxLength={100}
        />
        <Textarea
          placeholder="Tulis komentar Anda..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          className="bg-background resize-none"
          maxLength={1000}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Komentar akan ditampilkan setelah disetujui admin
          </p>
          <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            Kirim Komentar
          </Button>
        </div>
      </form>

      {/* Pending notification */}
      {pendingCount > 0 && (
        <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 text-center">
          <p className="text-sm text-foreground">
            {pendingCount} komentar Anda sedang menunggu persetujuan admin.
          </p>
        </div>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-muted-foreground">Belum ada komentar. Jadilah yang pertama!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-card border border-border rounded-xl p-6">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(comment.author_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-foreground">{comment.author_name}</span>
                    <span className="text-sm text-muted-foreground">• {formatDate(comment.created_at)}</span>
                  </div>
                  <p className="text-foreground/80">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
