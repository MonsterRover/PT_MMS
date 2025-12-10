-- Create news articles table
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Admin',
  category TEXT NOT NULL DEFAULT 'Berita',
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_published BOOLEAN NOT NULL DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (published news only)
CREATE POLICY "Anyone can view published news" 
ON public.news 
FOR SELECT 
USING (is_published = true);

-- Create index for better performance
CREATE INDEX idx_news_published_at ON public.news (published_at DESC);
CREATE INDEX idx_news_slug ON public.news (slug);
CREATE INDEX idx_news_category ON public.news (category);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample news data
INSERT INTO public.news (title, slug, excerpt, content, image_url, author, category, published_at) VALUES
('PT. Mitra Muratara Sejahtera Raih Penghargaan Perusahaan Sawit Berkelanjutan', 'penghargaan-sawit-berkelanjutan-2024', 'PT. Mitra Muratara Sejahtera berhasil meraih penghargaan sebagai perusahaan sawit berkelanjutan dari Kementerian Pertanian.', 'PT. Mitra Muratara Sejahtera kembali mengukir prestasi membanggakan dengan meraih penghargaan sebagai Perusahaan Sawit Berkelanjutan Tahun 2024 dari Kementerian Pertanian Republik Indonesia.

Penghargaan ini diberikan atas komitmen perusahaan dalam menerapkan praktik pertanian berkelanjutan, menjaga kelestarian lingkungan, dan memberdayakan masyarakat sekitar perkebunan.

Direktur Utama PT. Mitra Muratara Sejahtera menyatakan bahwa penghargaan ini merupakan hasil kerja keras seluruh tim dan komitmen perusahaan untuk terus berkontribusi dalam pembangunan berkelanjutan.', 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800', 'Tim Redaksi', 'Penghargaan', NOW() - INTERVAL '2 days'),
('Kemitraan Baru dengan Petani Lokal untuk Peningkatan Produktivitas', 'kemitraan-petani-lokal-2024', 'Program kemitraan dengan petani lokal berhasil meningkatkan produktivitas sawit hingga 30% dalam 6 bulan terakhir.', 'PT. Mitra Muratara Sejahtera terus memperluas program kemitraan dengan petani sawit lokal di wilayah operasional perusahaan.

Program ini bertujuan untuk meningkatkan produktivitas dan kualitas hasil panen melalui transfer teknologi, pelatihan budidaya, dan pendampingan teknis.

Dalam 6 bulan terakhir, program ini berhasil meningkatkan produktivitas sawit para petani mitra hingga 30%. Hal ini memberikan dampak positif terhadap kesejahteraan ekonomi masyarakat sekitar.

"Kami berkomitmen untuk tumbuh bersama masyarakat dan menciptakan nilai tambah bagi semua pemangku kepentingan," ujar Manajer Program Kemitraan.', 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=800', 'Tim Redaksi', 'Kemitraan', NOW() - INTERVAL '5 days'),
('Implementasi Teknologi Smart Farming di Perkebunan Sawit', 'implementasi-smart-farming-2024', 'PT. Mitra Muratara Sejahtera mengadopsi teknologi smart farming untuk meningkatkan efisiensi operasional perkebunan.', 'Dalam upaya meningkatkan efisiensi dan produktivitas, PT. Mitra Muratara Sejahtera mulai mengimplementasikan teknologi smart farming di seluruh area perkebunan.

Teknologi ini mencakup penggunaan drone untuk monitoring tanaman, sensor IoT untuk pemantauan kondisi tanah dan cuaca, serta sistem manajemen data terintegrasi.

Dengan teknologi ini, perusahaan dapat mengoptimalkan penggunaan sumber daya, mendeteksi masalah lebih dini, dan meningkatkan hasil panen secara signifikan.

Investasi dalam teknologi ini merupakan bagian dari komitmen perusahaan untuk menjadi pemimpin dalam industri sawit modern dan berkelanjutan.', 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=800', 'Tim Redaksi', 'Teknologi', NOW() - INTERVAL '10 days'),
('Program CSR Pendidikan untuk Anak-anak di Desa Sekitar Perkebunan', 'program-csr-pendidikan-2024', 'Perusahaan meluncurkan program beasiswa dan bantuan pendidikan untuk anak-anak di desa sekitar perkebunan.', 'PT. Mitra Muratara Sejahtera meluncurkan program Corporate Social Responsibility (CSR) di bidang pendidikan untuk mendukung masa depan anak-anak di desa sekitar perkebunan.

Program ini mencakup pemberian beasiswa, renovasi fasilitas sekolah, pengadaan buku dan perlengkapan belajar, serta program mentoring untuk siswa berprestasi.

Tahun ini, perusahaan telah memberikan beasiswa kepada 100 siswa berprestasi dari tingkat SD hingga SMA. Selain itu, perusahaan juga merenovasi 5 sekolah dasar di wilayah operasional.

"Investasi dalam pendidikan adalah investasi untuk masa depan yang lebih baik," kata Direktur CSR perusahaan.', 'https://images.unsplash.com/photo-1501286354670-28d7a0fcc3c9?w=800', 'Tim Redaksi', 'CSR', NOW() - INTERVAL '15 days');