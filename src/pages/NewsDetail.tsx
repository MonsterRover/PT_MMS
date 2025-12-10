import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  author: string;
  category: string;
  published_at: string;
}

interface RelatedNewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string | null;
  author: string;
  category: string;
  published_at: string;
}

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedNews, setRelatedNews] = useState<RelatedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) {
      console.error("Error fetching article:", error);
    } else if (data) {
      setArticle(data);
      document.title = `${data.title} | PT. Mitra Muratara Sejahtera`;
      fetchRelatedNews(data.category, data.id);
    }
    setLoading(false);
  };

  const fetchRelatedNews = async (category: string, currentId: string) => {
    const { data } = await supabase
      .from("news")
      .select("id, title, slug, excerpt, image_url, author, category, published_at")
      .eq("is_published", true)
      .eq("category", category)
      .neq("id", currentId)
      .order("published_at", { ascending: false })
      .limit(3);

    if (data) {
      setRelatedNews(data);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-pulse">
              <div className="h-8 bg-muted rounded w-1/4 mb-4" />
              <div className="h-12 bg-muted rounded w-3/4 mb-8" />
              <div className="h-96 bg-muted rounded-2xl mb-8" />
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Artikel Tidak Ditemukan
            </h1>
            <p className="text-muted-foreground mb-8">
              Maaf, artikel yang Anda cari tidak tersedia.
            </p>
            <Link to="/news">
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Berita
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Article Header */}
      <section className="pt-32 pb-8 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/news"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Berita
            </Link>

            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              {article.category}
            </Badge>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 animate-fade-up">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(article.published_at)}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.author}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden mb-10 shadow-xl">
              <img
                src={article.image_url || "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=1200"}
                alt={article.title}
                className="w-full h-auto aspect-video object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-10">
              {article.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-foreground/80 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share Section */}
            <div className="bg-card border border-border rounded-xl p-6 mb-10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Share2 className="h-5 w-5" />
                  <span className="font-medium">Bagikan artikel ini</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            <Separator className="my-10" />

            {/* Comment Section */}
            <CommentSection newsId={article.id} articleTitle={article.title} />
          </div>
        </div>
      </section>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Berita Terkait
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews.map((item) => (
                  <Link
                    key={item.id}
                    to={`/news/${item.slug}`}
                    className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="h-32 overflow-hidden">
                      <img
                        src={item.image_url || "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400"}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-2">
                        {formatDate(item.published_at)}
                      </p>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default NewsDetail;
