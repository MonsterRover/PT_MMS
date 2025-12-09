import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string | null;
  category: string;
  published_at: string;
}

const NewsPreviewSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("news")
      .select("id, title, slug, excerpt, image_url, category, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Error fetching news:", error);
    } else {
      setNews(data || []);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded w-48 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-muted rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-6 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Berita Terkini
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Berita & <span className="text-primary">Artikel</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ikuti perkembangan terbaru dari PT. Mitra Mutiara Sejahtera
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {news.map((item, index) => (
            <article
              key={item.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/news/${item.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image_url || "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    {formatDate(item.published_at)}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm">
                    Baca Selengkapnya
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/news">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Lihat Semua Berita
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsPreviewSection;
