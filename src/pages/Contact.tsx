import { useState } from 'react';
import { z } from 'zod';
import { Mail, User, MessageSquare, Send, Loader2, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: 'Nama minimal 2 karakter' }).max(100),
  email: z.string().trim().email({ message: 'Email tidak valid' }).max(255),
  subject: z.string().trim().min(5, { message: 'Subjek minimal 5 karakter' }).max(200),
  message: z.string().trim().min(20, { message: 'Pesan minimal 20 karakter' }).max(2000),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = contactSchema.safeParse(form);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

    setIsSubmitting(false);

    if (error) {
      toast.error('Gagal mengirim pesan. Silakan coba lagi.');
      return;
    }

    toast.success('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Karir & Recruitment
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bergabunglah dengan tim PT. Mitra Mutiara Sejahtera. Kami selalu mencari talenta terbaik 
              untuk berkontribusi dalam pembangunan industri kelapa sawit berkelanjutan di Indonesia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Info Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Mengapa Bergabung dengan Kami?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <h4 className="font-semibold text-foreground">Lingkungan Kerja Profesional</h4>
                      <p className="text-sm text-muted-foreground">
                        Budaya kerja yang mendukung pengembangan karir dan keseimbangan hidup.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <h4 className="font-semibold text-foreground">Pelatihan & Pengembangan</h4>
                      <p className="text-sm text-muted-foreground">
                        Program pelatihan berkelanjutan untuk meningkatkan kompetensi karyawan.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <h4 className="font-semibold text-foreground">Jenjang Karir Jelas</h4>
                      <p className="text-sm text-muted-foreground">
                        Kesempatan promosi berdasarkan kinerja dan dedikasi.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <h4 className="font-semibold text-foreground">Benefit Kompetitif</h4>
                      <p className="text-sm text-muted-foreground">
                        Gaji kompetitif, asuransi kesehatan, dan berbagai tunjangan lainnya.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Posisi yang Tersedia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground">Asisten Kebun</h4>
                    <p className="text-sm text-muted-foreground">Kalimantan Barat</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground">Staff Administrasi</h4>
                    <p className="text-sm text-muted-foreground">Jakarta</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground">Teknisi Mesin</h4>
                    <p className="text-sm text-muted-foreground">Kalimantan Barat</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Kirim Lamaran</CardTitle>
                <CardDescription>
                  Isi formulir di bawah ini untuk mengirimkan lamaran atau pertanyaan terkait karir.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Nama Anda"
                        className="pl-10"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        className="pl-10"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek / Posisi yang Dilamar</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="subject"
                        placeholder="Contoh: Lamaran Asisten Kebun"
                        className="pl-10"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan / Deskripsi Diri</Label>
                    <Textarea
                      id="message"
                      placeholder="Ceritakan tentang diri Anda, pengalaman, dan alasan ingin bergabung..."
                      rows={5}
                      className="resize-none"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    Kirim Lamaran
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
